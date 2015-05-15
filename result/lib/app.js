#!/usr/bin/env node

/**
 * run.sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */

'use strict';

var RSMQWorker = require('rsmq-worker'),
	db = require('./db'),
	log = require('winston');

	var redisHost = process.env.REDIS_HOST;
	var resultQueue = process.env.REDIS_RESULT_QUEUE;
	var redisPassword = process.env.REDIS_PASSWORD;

	if (!redisHost || !resultQueue || !redisPassword) {
		console.log('Missing env info, make sure REDIS is configured ' + JSON.stringify(process.env));
		process.exit(1);
	}

console.log('Starting result listener on queue ' + resultQueue);

var options = {
	host: redisHost,
	invisibletime: 10,
	timeout: 0,
	options: {
		'auth_pass': redisPassword
	}
};

var resultWorker = new RSMQWorker(resultQueue, options);

resultWorker.on('message', function(msg, next) {
	// got an message, lets parse it
	var mess = JSON.parse(msg);
	log.debug('Got message', mess);
	db.update(mess, function() {
				next();
			});
	});

resultWorker.start();
