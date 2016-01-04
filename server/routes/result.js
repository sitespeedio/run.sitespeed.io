/**
 * Sitespeed.io - How speedy is your site? (https://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var express = require('express'),
db = require('../db'),
md5 = require('MD5'),
moment = require('moment');

var router = express.Router();

router.get('/:sessionId', function(req, res) {
	var sessionId = req.params.sessionId;
	var queueNumber = req.cookies.ssioqueue;

	db.getStatus(sessionId, function(err, status, created, url) {

		if (err) {
			res.render('unknown', {
				layout: 'main',
				bodyId: 'extra',
				url: url
			});
			return;
		}
		 if (status === 'done') {
			var date = moment(created);
			var hash = (md5(date)).substring(0, 4);
			var myPath = hash + '-' + date.year() + '/' + date.month() + '/' + date.date();
			res.redirect('https://results.sitespeed.io/' + myPath + '/' + sessionId + '/index.html');

		} else if (status === 'failed') {
			res.render('failed', {
				status: status,
				layout: 'main',
				'id': sessionId,
				bodyId: 'extra',
				url: url
			});
		}
		else if (status === 'waiting') {
			res.render('running-waiting', {
				status: status,
				layout: 'running',
				'id': sessionId,
				bodyId: 'process',
				url: url,
				queueNumber: queueNumber
			});
		}
		else {
			res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
			res.header('Pragma', 'no-cache');
			res.header('Expires', 0);
			res.render('running', {
				status: status,
				statusText: getStatusText(status),
				layout: 'running',
				'id': sessionId,
				bodyId: 'process',
				url: url
			});
		}
	});

});

function getStatusText(status) {
	var display = 'Testing your site';
	if (status === 'waiting') {
		display = 'Waiting in line';
	} else if (status === 'uploading') {
		display = 'Uploading the result';
	} else if (status === 'crawling') {
		display = 'Crawling the site';
	} else if (status === 'analyzing') {
		display = 'Fetching the URL';
	} else if (status === 'measuring') {
		display = 'Collecting timing metrics';
	}
	return display;
}

module.exports = router;
