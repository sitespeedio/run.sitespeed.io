/**
 * run.sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var Docker = require('dockerode'),
  log = require('winston');

var docker = new Docker(); // NOTE must have DOCKER_HOST env variable set in shell

module.exports = {

  pull: function(cb) {
    docker.pull('sitespeedio/sitespeed.io', function(err, stream) {
      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err, output) {
        if (err) {
          log.error('Error:' + err);
        }
        cb();
      }

      function onProgress(event) {
        log.debug(event.status);
      }
    });
  },
  run: function(config, cb) {

    var stream = {
    write: function(message, encoding){
        log.info(message);
      }
    };

    docker.run('sitespeedio/sitespeed.io', ['sitespeed.io', '--url', config.url, '--maxPagesToTest', '' + config.maxPagesToTest,
      '-d', '' + config.deepth,
      '--browser', config.browser, '--no', '' + config.no, '--outputFolderName', config.outputPath,
      '--suppressDomainFolder', '--connection', config.connection,
      '--seleniumServer', 'http://127.0.0.1:4444/wd/hub', '--phantomjsPath',
      '/usr/local/phantomjs/bin/phantomjs'
    ], stream, function(err, data, container) {
      cb(err);
    }).on('container', function(container) {
      container.defaultOptions.start.Binds = [config.dataDir + ':/sitespeed.io:rw'];
    });

  }
};
