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
		if (err) {
			log.error(err);
			res.json({
				status: 'unknown'
			});
			return;
		}
		if (status === 'waiting') {
			res.json({
				status: 'waiting'
			});
		} else if (status === 'done') {
			res.json({
				status: 'finished'
			});
			// res.redirect('/results/' + row.session_id + '/');
		} else if (status === 'running') {
			res.json({
				status: 'running'
			});
		} else if (status === 'uploading') {
			res.json({
				status: 'uploading'
			});
		} else {
			res.json({
				status: 'failed'
			});
		}

	});

});

module.exports = router;
