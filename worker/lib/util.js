/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
module.exports = {
  getStars: function(score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
    return '&#9733;&#9733;&#9733;&#9733;&#9733;';
    }
    else if (score > 80) {
    return '&#9733;&#9733;&#9733;&#9733;';
    }
    else if (score > 70) {
    return '&#9733;&#9733;&#9733;';
    }
    else if (score > 60) {
    return '&#9733;&#9733;';
    }
    return '&#9733;';
  },
  getBodyId: function(score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
      return 'great-result';
    }
    else if (score > 70) {
      return 'good-result';
    }
    return 'bad-result';
  },
  getBoxTitle: function(score, speedIndex) {
    if (score > 90 && speedIndex < 1000) {
      return 'Great performance!';
    }
    else if (score > 70) {
      return 'Solid performance!';
    }
    return 'You can do better!';
  }
};
