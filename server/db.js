/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var mysql = require('mysql'),
  log = require('winston');

var host = process.env.DATABASE_HOST;
var password = process.env.DATABASE_PASSWORD;
var user = process.env.DATABASE_USER;

if (!host || !password || !user) {
  console.log('Missing env info' + host + password + user);
  console.log(JSON.stringify(process.env));
  process.exit(1);
}

var pool = mysql.createPool({
  connectionLimit: 10,
  host: host,
  user: user,
  password: password,
  database: 'sitespeedio'
});

module.exports = {
  storeRun: function(url, id, ip, creationDate, cb) {

    pool.getConnection(function(err, connection) {

      if (err) {
        log.error('Couldn\'t get a connection from the pool', err);
        cb(err);
      } else {

        var post = {
          id: null,
          url: url,
          testId: id,
          created: creationDate.format('gggg-MM-DD HH:mm:ss'),
          testerIp: ip,
          status: 'waiting'
        };

        var query = connection.query('INSERT INTO runs SET ?', post, function(e, result) {
          if (e) {
            log.error('Couldn\'t insert the data into the database', query.sql, post, e);
          }
          connection.release();
          cb(err);
        });
      }
    });

  },
  getStatus: function(id, cb) {
    pool.getConnection(function(err, connection) {
      if (err) {
        return cb(err);
      }

      var post = {
        testId: id
      };
      var query = connection.query('SELECT status, created FROM runs WHERE ?', post, function(error, results, fields) {
        if (error) {
          log.error('Couldn\'t get status from the the database', query.sql, post, error);
          cb(error);
        } else {
          if (results && results[0]) {
            cb(null, results[0].status, results[0].created);
          } else {
            // ooops we should return a error here
            cb();
          }
        }
        connection.release();
      });

    });
  }
};
