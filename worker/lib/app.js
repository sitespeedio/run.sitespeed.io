#!/usr/bin/env node

/**
 * run.sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var RSMQWorker = require('rsmq-worker'),
  docker = require('./docker'),
  path = require('path'),
  generateHtml = require('./generateHtml'),
  fs = require('fs-extra'),
  s3 = require('./s3'),
  async = require('async'),
  targz = require('tar.gz'),
  util = require('./util'),
  log = require('winston');


var args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Usage: node worker.js <FETCH_QUEUE_NAME> <DATA_DIR>');
  process.exit(1);
}

var fetchQueue = args[0];
var dataDir = args[1];

var redisHost = process.env.REDIS_HOST;
var resultQueue = process.env.REDIS_RESULT_QUEUE;
var redisPassword = process.env.REDIS_PASSWORD;

if (!redisHost || !resultQueue || !redisPassword) {
  console.log('Missing env info, make sure REDIS is configured ' + JSON.stringify(process.env));
  process.exit(1);
}

var options = {
  host: redisHost,
  invisibletime: 120,
  timeout: 0,
  maxReceiveCount: 1,
  options: {
    'auth_pass': redisPassword
  }
};

console.log('Starting worker listening on queue ' + fetchQueue + ' send result to queue ' + resultQueue);

var fetchWorker = new RSMQWorker(fetchQueue, options);
var resultWorker = new RSMQWorker(resultQueue, options);

fetchWorker.on('message', function(msg, next) {
  // got an message, lets parse it
  var mess = JSON.parse(msg);

  startJob(mess, function() {
    next();
  });
});

fetchWorker.on('error', function(err, msg) {
  log.error('Error fetching message ' + msg.id, err);
});

fetchWorker.start();

function startJob(message, cb) {

  if (message.u === undefined) {
    log.error('Missing url for  ' + message);
    cb();
    return;
  }

  var outputPath = message.p + '/' + message.id;

  var config = {
    url: message.u,
    browser: message.b,
    connection: message.c,
    maxPagesToTest: message.m || 1,
    no: message.n || 1,
    deepth: message.d || 0,
    outputPath: outputPath,
    dataDir: dataDir
  };

  var score = -1;
  var speedIndex = -1;

  log.debug('Starting job with url: ' + config.url + ' ' + message.id);

  async.series([
      function(callback) {
        resultWorker.send(JSON.stringify({
          id: message.id,
          status: 'running'
        }));
        callback();
      },
      function(callback) {
        docker.run(config, callback);
      },
      function(callback) {
        var json;
        try {
          json = require(path.join(dataDir, 'sitespeed-result', outputPath, '/data/summary.json'));
        } catch (err) {
          callback(err);
        }
        if (json) {
          json.forEach(function(aggregate) {
            if (aggregate.id === 'ruleScore') {
              score = aggregate.stats.median;
            } else if (aggregate.id === 'speedIndex') {
              speedIndex = aggregate.stats.median;
            }
          });
          // rename index to index2, will create a new file
          fs.rename(path.join(dataDir, 'sitespeed-result', outputPath, 'index.html'), path.join(dataDir,
            'sitespeed-result', outputPath, 'index2.html'), callback);
        }
      },
      function(callback) {
        var data = {
          id: message.id,
          speedIndex: speedIndex,
          score: score,
          url: config.url,
          link: 'index2.html',
          myUrl: 'http://results.sitespeed.io/' + outputPath + '/',
          stars: util.getStars(score, speedIndex),
          bodyId: util.getBodyId(score, speedIndex),
          boxTitle: util.getBoxTitle(score, speedIndex)
        };
        generateHtml.generate(path.join(dataDir, 'sitespeed-result', outputPath), data, callback);
      },
      function(callback) {
        var files = ['data', 'config.json', 'sitespeed.io.log', 'browsermobproxy.log', 'browsertime.log'];

        async.each(files, function(file, thecb) {
          fs.remove(path.join(dataDir, 'sitespeed-result', outputPath, file), thecb);

        }, function(err) {
          if (err) {
            log.error('Error removing files ', err);
          }
          callback();

        });
      },
      function(callback) {
        fs.copy(path.join(__dirname, '../assets/'), path.join(dataDir, 'sitespeed-result', outputPath), function (err) {
          if (err) {
            log.error('Error copying files ', err);
          }
          callback();
        });
      },
      function(callback) {
        var compress = new targz().compress(path.join(dataDir, 'sitespeed-result', outputPath), path.join(dataDir,
          'sitespeed-result', outputPath, message.id + '.tar.gz'), function(err) {

          if (err) {
            log.error('Error compressing files ', err);
          }

          log.debug('Compressing files finished');
          callback(err);
        });
      },
      function(callback) {
        var status = 'uploading';
        resultWorker.send(JSON.stringify({
          status: status,
          id: message.id
        }));
        callback();
      },
      function(callback) {
        s3.uploadDir(path.join(dataDir, 'sitespeed-result', outputPath), outputPath, callback);
      }
    ],
    // optional callback
    function(err, results) {
      if (err) {
        resultWorker.send(JSON.stringify({
          status: 'failed',
          id: message.id
        }));
      } else {

        var status = 'done';
        resultWorker.send(JSON.stringify({
          status: status,
          id: message.id,
          score: score,
          speedIndex: speedIndex
        }));
      }
      cb();
    });

}
