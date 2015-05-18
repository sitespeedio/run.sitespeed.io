/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var mysql = require('mysql'),
moment = require('moment'),
log = require('winston');

var host = process.env.DATABASE_HOST || '192.168.59.103';
var password = process.env.DATABASE_PASSWORD || 'aa7gHGa5favaj9a9hjnmsFta';
var user = process.env.DATABASE_USER || 'sitespeedio';


var pool = mysql.createPool({
	connectionLimit: 2,
	host: host,
	user: user,
	password: password,
  database: 'sitespeedio'
});

module.exports = {
update: function (message, cb) {

  var post = {changed: moment().format('gggg-MM-DD HH:mm:ss')};

	Object.keys(message).forEach(function(key) {
		// just skip the id
		if (key!=='id') {
			post[key] = message[key];
		}
	});

	var sql = 'UPDATE runs SET ? WHERE testId = \'' + message.id + '\'';
	pool.getConnection(function(err, connection) {

    if (err) {
      log.error('Couldn\'t get a connection from the pool', err);
			cb();
    }
		else {
		// TODO imnplement to copy data from runs to resulsts
		var query = connection.query(sql, post, function(e, result) {
			/*
			INSERT INTO results
			SELECT *
			FROM runs WHERE testId = '230c82ad-5b87-4b26-ba27-c1107f41c491';
			DELETE FROM runs WHERE testId =*/

      if (e) {
				log.error('Couldn\'t get a update the database', query.sql, e);
			}
			connection.release();
      cb();
		});
	}
	});
}
};
