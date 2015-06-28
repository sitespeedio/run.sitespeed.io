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
    if (score > 95 && speedIndex < 700) {
      return 'hero';
    }
    else if (score > 90 && speedIndex < 1000) {
      return 'great-result';
    } else if (speedIndex > 5000) {
      return 'bad-result';
    } else if (score > 70) {
      return 'good-result';
    }
    return 'bad-result';
  },
  getBoxTitle: function(connection, score, speedIndex) {
    if (score > 95 && speedIndex < 700) {
      return 'Wow HERO performance!';
    }
    else if (score > 90 && speedIndex < 1000) {
      return 'Great performance!';
    } else if (speedIndex > 5000) {
      return 'You can do better!';
    } else if (score > 70) {
      return 'Solid performance!';
    }
    return 'You can do better!';
  },
  getBoxDescription: function(connection, score, speedIndex) {
    if (score > 95 && speedIndex < 700) {
      return 'Wow!!! There must be a super performance hero that helped building this site!';
    }
    else if (score > 90 && speedIndex < 1000) {
      return 'This is really really good.';
    } else if (speedIndex > 5000) {
      return 'Yes, here we have a lot of room for improvements.';
    } else if (score > 70) {
      return 'The performance is OK and there are some things we can do to improve it.';
    }
    return 'Here we have a lot of room for improvements.';
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
  },
  capitalize: function(word) {
    if (word) {
      return word.substr(0, 1).toUpperCase() + word.substr(1);
    } else {
      return '';
    }
  }

};
