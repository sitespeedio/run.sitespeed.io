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
  log = require('winston'),
  sponsors = require('./routes/sponsors'),
  result = require('./routes/result');

	var logLevel = process.env.LOG_LEVEL || 'info';
	var logFile = process.env.LOG_FILE || 'server.log';

	var serverPort = process.env.SERVER_PORT || 3000;

	log.add(log.transports.File, {
		filename: logFile,
		handleExceptions: true,
		level: logLevel,
		json: false,
    exitOnError: false
		});

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
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
  extname: '.hb'
}));
app.set('view engine', '.hb');
app.set('views', path.join(__dirname, 'views'));

app.enable('view cache');

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use('/img', express.static(path.join(__dirname, 'public', 'img'), {
  maxAge: '366 days'
}));

app.use('/texts', express.static(path.join(__dirname, 'public', 'texts'), {
  maxAge: '10 minutes'
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

var server = app.listen(serverPort, function() {

  var host = server.address().address;
  var port = server.address().port;

  log.info('Web app listening at http://%s:%s', host, port);
});

process.on('SIGTERM', function () {
  server.close(function () {
    process.exit(0);
  });
});
