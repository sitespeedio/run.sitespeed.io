/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
module.exports = {
  getStars: function(connection, score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
      return '&#9733;&#9733;&#9733;&#9733;&#9733;';
    } else if (speedIndex > 5000) {
      return '&#9733;';
    } else if (score > 80) {
      return '&#9733;&#9733;&#9733;&#9733;';
    } else if (score > 70) {
      return '&#9733;&#9733;&#9733;';
    } else if (score > 60) {
      return '&#9733;&#9733;';
    }
    return '&#9733;';
  },
  getBodyId: function(connection, score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
      return 'great-result';
    } else if (speedIndex > 5000) {
      return 'bad-result';
    } else if (score > 70) {
      return 'good-result';
    }
    return 'bad-result';
  },
  getBoxTitle: function(connection, score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
      return 'Great performance!';
    } else if (speedIndex > 5000) {
      return 'You can do better!';
    } else if (score > 70) {
      return 'Solid performance!';
    }
    return 'You can do better!';
  },
  getLocation: function(queueName) {
    if (queueName === 'nyc') {
      return 'New York';
    } else if (queueName === 'sf') {
      return 'San Francisco';
    } else if (queueName === 'amsterdam') {
      return 'Amsterdam';
    }
    else {
      return '';
    }
  }

};
