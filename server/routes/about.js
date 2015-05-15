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
	res.render('about/index', {
		layout: 'main',
		bodyId: 'extra',
		title: 'Learn more about sitespeed.io',
		description: 'Sitespeed.io is an Open Source tool that helps you analyze your website speed and performance based on performance best practices and timing metrics.'
	});
});

module.exports = router;
