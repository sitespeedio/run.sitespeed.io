/**
 * Sitespeed.io - How speedy is your site? (https://www.sitespeed.io)
 * Copyright (c) 2015, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
module.exports = {
  getStars: function(connection, score, speedIndex) {
    var n = calculateAggregatedScore(score, speedIndex);
    return new Array(n + 1).join('&#9733;'); // 1-6 stars
  },
  getBodyId: function(connection, score, speedIndex) {
    var ids = {
      6: 'hero',
      5: 'great-result',
      4: 'good-result'
    };
    var n = calculateAggregatedScore(score, speedIndex);

    return ids[n] || 'bad-result';
  },
  getBoxTitle: function(connection, score, speedIndex) {
    var titles = {
      6: 'Wow HERO performance!',
      5: 'Great performance!',
      4: 'Good performance!',
      3: 'Solid performance!'
    };
    var n = calculateAggregatedScore(score, speedIndex);

    return titles[n] || 'You can do better!';
  },
  getBoxDescription: function(connection, score, speedIndex) {
    if (score > 95 && speedIndex < 700) {
      return 'Wow!!! There must be multiple super performance heroes that works on this site. The score and the speed are really great!';
    }
    else if (score > 90 && speedIndex < 1000) {
      return 'Yeah this is really really good. Maybe there are some small tweaks you can do to improve the performance even more.';
    } else if (speedIndex < 2000) {
        return 'Yeah this the speed is really good and it seems like you can do some work to follow performance best practice rules, that will make your site even faster.';
    }
    else if (speedIndex > 10000) {
      return 'Well how should I say this? This seems like the worst performance we have ever seen. But don\'t worry, there\'s a lot you can do to fix it';
    }
    else if (speedIndex > 5000) {
      return 'It seems there are a lot of room for improvements on this site. ';
    } else if (score > 80) {
      return 'The score is ok and there are some things we can do to improve it, lets checkout the full report.';
    } else if (score < 50) {
      return 'Hmm are site a fake site? It seems like the rule score is incredible low, you need to follow the performance best practice rules to make it faster. If this site isn\'t yours, please contact the owner and help the make the site better :)';
    }
    return 'There\'s a lot of room for improvements here. Make sure you follow the most important web performance best practice rules and your site will score even better.';
  },
  getLocation: function(queueName) {
    var queueLocations = {
      'nyc': 'New York',
      'sf': 'San Francisco',
      'amsterdam': 'Amsterdam',
      'singapore': 'Singapore'
    };

    return queueLocations[queueName] || '';
  },
  capitalize: function(word) {
    if (word) {
      return word.substr(0, 1).toUpperCase() + word.substr(1);
    } else {
      return '';
    }
  }
};

function calculateAggregatedScore(ruleScore, speedIndex) {
  if (ruleScore > 95 && speedIndex < 700) {
    return 6;
  }
  else if (ruleScore > 90 && speedIndex < 1000) {
    return 5;
  }
  else if (speedIndex < 2000) {
    return 3;
  }
  else if (speedIndex > 5000) {
    return 1;
  } else if (ruleScore > 80) {
    return 4;
  } else if (ruleScore > 70) {
    return 3;
  } else if (ruleScore > 60) {
    return 2;
  }
  return 1;
}