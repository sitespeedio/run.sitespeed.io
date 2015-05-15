/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('dashboard/index', {
		layout: 'main',
		bodyId: 'dashboard',
		title: 'Open Source Web Performance Dashboard',
		description: 'We have put a lot of love into making it easy to create your own performance dashboard. To get it up and running you need Docker. That’s it :)'
	});
});

module.exports = router;
