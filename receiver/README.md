# The receiver

The receiver receives messages from the worker(s) and store them in the database.

Before starting a receiver, make sure you have exported your [environment variables](https://github.com/sitespeedio/run.sitespeed.io/blob/master/setup.sh).


# Running Docker version
Export the environment in your start script that is feed to the Docker container. Start by editing your *receiver-start.sh* file and then start yoru container.

~~~
#!/bin/bash

export NODE_ENV=production
export DATABASE_HOST=****
export DATABASE_PASSWORD=****
export DATABASE_USER=****

export REDIS_HOST=****
export REDIS_QUEUES=****
export REDIS_PASSWORD=****
export REDIS_RESULT_QUEUE=****

run.sitespeed.io-receiver
~~~


And start the container:
~~~
docker run --restart="always" --name sitespeed-receiver -v /tmp:/var/log/sitespeed.io -v /root/receiver-start.sh:/home/root/scripts/start.sh -d soulgalore/run.sitespeed.io-receiver
~~~
