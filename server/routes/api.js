/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var express = require('express'),
  db = require('../db'),
  log = require('winston');

var router = express.Router();

router.get('/', function(req, res) {
	res.json({
		message: 'The sitespeed.io online API'
	});
});

router.get('/status/:sessionId', function(req, res) {
	var sessionId = req.params.sessionId;
	log.debug('API access for ' + sessionId);
	db.getStatus(sessionId, function(err, status) {

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    if (err) {
			log.error(err);
			res.json({
				status: 'unknown'
			});
			return;
		}
		res.json({
				status: status
			});
	});

});

module.exports = router;
