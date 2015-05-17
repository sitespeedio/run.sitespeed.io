#!/usr/bin/env node
/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var path = require('path'),
	express = require('express'),
	compress = require('compression'),
	handlebars = require('express-handlebars'),
  bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	expressMinify = require('express-beautify'),
  api = require('./routes/api'),
  index = require('./routes/index'),
  about = require('./routes/about'),
  dashboard = require('./routes/dashboard'),
	faq = require('./routes/faq'),
  sponsors = require('./routes/sponsors'),
  result = require('./routes/result');

var app = express();

var minify = expressMinify.minify({
	collapseWhitespace: true,
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true
});

app.use(compress());
app.use(responseTime());
app.use(minify);

app.engine('.hb', handlebars({
	layoutsDir: path.join('views', 'layouts'),
	partialsDir: path.join('views', 'partials'),
	defaultLayout: 'main',
	extname: '.hb'
}));
app.set('view engine', '.hb');
app.set('views', 'views');

app.enable('view cache');

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

app.use('/img', express.static(path.join('public', 'img'), {
	maxAge: '366 days'
}));


app.use('/result', result);
app.use('/api', api);
app.use('/sponsors', sponsors);
app.use('/dashboard', dashboard);
app.use('/about', about);
app.use('/faq', faq);
app.use('/', index);

app.use(function(req, res) {
	res.status(400);
	res.render('404', {
		title: '404: File Not Found',
		layout: 'main',
		bodyId: 'extra'
	});
});

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Web app listening at http://%s:%s', host, port);
});
