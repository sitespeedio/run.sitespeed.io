/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';

var moment = require('moment'),
minify = require('html-minifier').minify,
path = require('path'),
fs = require('fs-extra'),
log = require('winston'),
hb = require('handlebars');

var compiledTemplates = compileTemplates(path.join(__dirname, '../templates/'));
var compiledPartials = compileTemplates(path.join(__dirname, '../templates/partials/'));

for (var key in compiledPartials) {
  if (compiledPartials.hasOwnProperty(key)) {
    hb.registerPartial(key, compiledPartials[key]);
  }
}

module.exports = {
generate: function (dir, data, cb) {

	var file = path.join(dir, 'index.html');

	var result = compiledTemplates.index(data);

	var result2 = minify(result, { removeComments: true, collapseWhitespace: true });

  fs.outputFile(file, result2, function(err) {
    if (err) {
      log.log('error', 'Couldn\'t write the file ' + file + ' err:' + err);
    } else {
      log.log('info', 'Wrote file ' + file);
    }
    cb(err);
  });

  }
};

function compileTemplates(folderPath) {
  // TODO would be cool to do this async
  var templates = {};
  fs.readdirSync(folderPath).forEach(function(file) {
    if (!fs.lstatSync(path.join(folderPath + file)).isDirectory()) {
      templates[path.basename(file, '.hb')] = hb.compile(fs.readFileSync(path.join(folderPath + file), 'utf8'));
    }
  });
  return templates;
}
