FROM ubuntu:14.04
MAINTAINER peter@soulgalore.com

# Massive love: https://github.com/jpetazzo/dind

RUN apt-get update -qq && apt-get install -qqy \
    apt-transport-https \
    ca-certificates \
    curl \
    lxc \
    iptables \
    git \
    nodejs \
    build-essential \
    npm --no-install-recommends && \
    ln -s /usr/bin/nodejs /usr/local/bin/node && \
    git clone https://github.com/sitespeedio/run.sitespeed.io.git -b did && \
    cd run.sitespeed.io/worker && \
    npm install -g && \
    npm cache clean && \
    apt-get purge -y npm git build-essential && \
    apt-get clean autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -sSL https://get.docker.com/ubuntu/ | sh

ADD ./scripts/wrapdocker /usr/local/bin/wrapdocker
RUN chmod +x /usr/local/bin/wrapdocker
ADD ./scripts/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Define additional metadata for our image.
ENV LOG_FILE /var/log/sitespeed.io/worker.log
VOLUME /var/lib/docker
CMD ["wrapdocker"]
