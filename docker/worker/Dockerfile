FROM sitespeedio/browsers:latest
MAINTAINER Peter Hedenskog <peter@soulgalore.com>

RUN \
apt-get update && \
apt-get install -y \
default-jre-headless \
git \
libicu52 \
nodejs \
build-essential \
npm --no-install-recommends && \
ln -s /usr/bin/nodejs /usr/local/bin/node && \
npm install -g sitespeed.io && \
git clone https://github.com/sitespeedio/run.sitespeed.io.git && \
cd run.sitespeed.io/worker && \
npm install -g && \
npm cache clean && \
apt-get purge -y npm git build-essential && \
apt-get clean autoclean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD ./scripts/ /home/root/scripts
ADD ./selenium-server-standalone-2.45.0.jar /home/root/
ADD ./phantomjs-2.0.0-ubuntu-14.04/phantomjs /usr/local/phantomjs/bin/

ENV LOG_FILE /var/log/sitespeed.io/worker.log
ENV NODE_ENV production
ENTRYPOINT ["/home/root/scripts/start.sh"]
