var log = require('winston'),
slack = require('winston-slack').Slack;

var domain = process.env.SLACK_DOMAIN,
token = process.env.SLACK_TOKEN,
level = process.env.SLACK_LEVEL,
username = process.env.SLACK_USERNAME,
channel = process.env.SLACK_CHANNEL;

if (domain && token && level && channel && username) {
log.add(slack, {
    domain: domain,
    apiToken: token,
    channel: '#' + channel,
    username: username,
    level: level,
    handleExceptions : true
});
}
else {
  log.info('Missing setup information for Slack.');
}
