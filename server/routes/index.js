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
  validateUrl = require('validator'),
  log = require('winston'),
  db = require('../db');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    bodyId: 'start',
    title: 'Analyze your page against web performance best practice rules and using metrics',
    description: 'How fast is your site? How good does it follow web performance best practice rules? Find out by using sitespeed.io.'
  });
});

router.post('/', function(req, res) {
  var queueName = req.body.location || 'nyc';
  var sessionId = uuid.v4();
  var ip = req.headers['X-Real-IP'] || req.connection.remoteAddress;

  log.info('Real ip:' + req.headers['X-Real-IP']);
  log.info('Remote address:' + req.connection.remoteAddress);
  log.info('Forwarded:' + req.headers['x-forwarded-for']);
  if(req.ip) log.info('req.ip:' + req.ip);

  if (!validateUrl.isURL(req.body.url)) {
    res.render('error', {
      text: 'The URL isn\'t valid',
      title: 'Ooops you need to have a valid URL',
      description: '',
      url: req.body.url
    });
    return;
  }

  var creationDate = moment();

  var config = {
    url: req.body.url.toLowerCase(),
    browser: req.body.browser || 'firefox',
    connection: req.body.connection || 'cable',
    maxPagesToTest: 1,
    numberOfRuns: 1,
    date: creationDate
  };


  // create the path to the result

  var hash = (md5(creationDate)).substring(0, 4);
  var myPath = hash + '-' + creationDate.year() + '/' + creationDate.month() + '/' + creationDate.date();

  queue.add(queueName, config, sessionId, myPath, function(err, id, queueNumber) {
    if (err) {
      res.redirect('/');
    } else {
      db.storeRun(config.url, sessionId, ip, creationDate, config.browser, queueName, function() {
        res.cookie('ssioqueue', queueNumber);
        // res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
        res.redirect('/result/' + sessionId);
      });
    }
  });
});

module.exports = router;
