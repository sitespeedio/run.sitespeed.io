/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var express = require('express'),
  uuid = require('node-uuid'),
  md5 = require('MD5'),
  moment = require('moment'),
  queue = require('../queue'),
  validateUrl = require('valid-url'),
  db = require('../db');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    bodyId: 'start',
    title: 'Analyze your page against web performance best practice rules',
    description: 'How fast is your site? How good does it follow web performance best practice rules? Find out by using sitespeed.io'
  });
});

router.post('/', function(req, res) {
  var queueName = req.body.location || 'nyc';
  var sessionId = uuid.v4();
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var creationDate = moment();

  var config = {
    url: req.body.url,
    browser: req.body.browser || 'firefox',
    connection: req.body.connection || 'cable',
    maxPagesToTest: req.body.maxPagesToTest || 1,
    date: creationDate
  };


  if (!validateUrl.isWebUri(config.url)) {
    res.render('error', {
      text: 'You need to write a valid url',
      title: 'Ooops you need to have a valid URL',
      description: ''
    });
    return;
  }

  // create the path to the result

  var hash = (md5(creationDate)).substring(0, 4);
  var myPath = hash + '-' + creationDate.year() + '/' + creationDate.month() + '/' + creationDate.date();

  queue.add(queueName, config, sessionId, myPath, function(err, id) {
    if (err) {
      res.redirect('/');
    } else {
      db.storeRun(config.url, sessionId, ip, creationDate, config.browser, queueName, function() {
        res.redirect('/result/' + sessionId);
      });
    }
  });
});

module.exports = router;
