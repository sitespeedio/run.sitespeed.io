/**
 * run.sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var Docker = require('dockerode');

var docker = new Docker(); // NOTE must have DOCKER_HOST env variable set in shell


module.exports = {
  run: function(config, cb) {

    docker.run('sitespeedio/sitespeed.io', ['sitespeed.io', '--url', config.url, '--maxPagesToTest', '' + config.maxPagesToTest,
      '-d', '' + config.deepth,
      '--browser', config.browser, '--no', '' + config.no, '--outputFolderName', config.outputPath,
      '--suppressDomainFolder', '--connection', config.connection,
      '--seleniumServer', 'http://127.0.0.1:4444/wd/hub', '--phantomjsPath',
      '/usr/local/phantomjs/bin/phantomjs'
    ], process.stdout, function(err, data, container) {
      cb(err);
    }).on('container', function(container) {
      container.defaultOptions.start.Binds = [config.dataDir + ':/sitespeed.io:rw'];
    });

  }
};
