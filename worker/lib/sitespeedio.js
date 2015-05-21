/**
 * run.sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var Sitespeed = require('sitespeed.io/lib/sitespeed'),
  log = require('winston');

module.exports = {
  run: function(config, cb) {
   var sitespeed = new Sitespeed();
   var options = {
     "url": config.url,
     "maxPagesToTest": config.maxPagesToTest,
     "deep": config.deepth,
     "browser":config.browser,
     "no": config.no,
     "outputFolderName": config.outputPath,
     "suppressDomainFolder": true,
     "connection": config.connection,
     "resultBaseDir": config.dataDir + '/sitespeed-result',
     "html": true
   };

   if (process.env.NODE_ENV  === 'production') {
     options.seleniumServer = 'http://127.0.0.1:4444/wd/hub';
     options.phantomjsPath = '/usr/local/phantomjs/bin/phantomjs';
   }

   sitespeed.run(options, function(err, data) {
     if (err) {
       log.error('Couldn\'t run sitespeed.io', err);
     }
    cb(err);
    });
  }
};
