/**
 * run.sitespeed.io - How speedy is your site? (https://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var Docker = require('dockerode'),
  log = require('winston'),
  util = require('util'),
  stream = require('stream');

var docker = new Docker(); // NOTE must have DOCKER_HOST env variable set in shell


module.exports = {

  pull: function(cb) {
    docker.pull('sitespeedio/sitespeed.io', function(err, stream) {
      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err, output) {
        if (err) {
          log.error('Error:' + err);
        }
        cb(err);
      }

      function onProgress(event) {
        log.debug(event.status);
      }
    });
  },
  run: function(config, resultWorker,  cb) {

    var myStream = new stream.Stream();
    myStream.writable = true;
    myStream.write = function(data) {
      log.debug(data);

      var status = undefined;
      if (data.indexOf('Will crawl') > -1) {
          status = 'crawling';
      } else if (data.indexOf('Running YSlow') > -1 ) {
        status = 'analyzing';
      }
      else if (data.indexOf('Running browsertime') > -1) {
        status =  'measuring';
      }

      if (status) {
        resultWorker.send(JSON.stringify({
          id: config.id,
          status: status,
          hostname: config.hostname
        }));
      }
      return true;
    };

    myStream.end = function(data) {
    };

    docker.run('sitespeedio/sitespeed.io', ['sitespeed.io', '--url', config.url, '--maxPagesToTest', '' + config.maxPagesToTest,
      '-d', '' + config.deep,
      '--browser', config.browser, '--no', '' + config.no, '--outputFolderName', config.outputPath,
      '--suppressDomainFolder', '--connection', config.connection,
      '--seleniumServer', 'http://127.0.0.1:4444/wd/hub', '--phantomjsPath',
      '/usr/local/phantomjs/bin/phantomjs'
    ], myStream, function(err, data, container) {
      if (err) {
        log.error('Error:' + util.inspect(err));
      }
      cb(err);
    }).on('container', function(container) {
      container.defaultOptions.start.Binds = [config.dataDir + ':/sitespeed.io:rw'];
    });

  }
};
