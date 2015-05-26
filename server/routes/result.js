/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var express = require('express'),
db = require('../db'),
md5 = require('MD5'),
log = require('winston'),
moment = require('moment');

var router = express.Router();

router.get('/:sessionId', function(req, res) {
	var sessionId = req.params.sessionId;

	db.getStatus(sessionId, function(err, status, created, url) {

		if (err) {
			log.error(err);
			res.render('failed', {
				layout: 'main',
				bodyId: 'extra'
			});
			return;
		}
		 if (status === 'done') {
			var date = moment(created);
			var hash = (md5(date)).substring(0, 4);
			var myPath = hash + '-' + date.year() + '/' + date.month() + '/' + date.date();
			res.redirect('http://results.sitespeed.io/' + myPath + '/' + sessionId + '/index.html');

		} else if (status === 'failed') {
			res.render('failed', {
				status: status,
				layout: 'main',
				'id': sessionId,
				bodyId: 'extra',
				url: url
			});
		} else {
			res.header("Cache-Control", "no-cache, no-store, must-revalidate");
			res.header("Pragma", "no-cache");
			res.header("Expires", 0);
			res.render('running', {
				status: status,
				layout: 'running',
				'id': sessionId,
				bodyId: 'process',
				url: url
			});
		}
	});

});

module.exports = router;
