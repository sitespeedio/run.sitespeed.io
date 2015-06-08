# The worker

The worker receives a message, starts a sitespeed.io (using the Dockerized version), uploads the result to S3 and sends status and end finished messages on a message queue.

Running this on the live site runs Docker in Docker (DiD) scoring 100 points in Docker coolness :)

Before starting a worker, make sure you have exported your [environment variables](https://github.com/sitespeedio/run.sitespeed.io/blob/master/setup.sh).


# Running Docker version
Since we are running DiD we need to start with the **privileged** parameter. Each worker also have their own start script where we export the environment config and start the service. Starting a worker needs to arguments: The name of the queue for inbound messages and the full path to the directory where the files will be stored.

Starting a worker listenting on the queue nyc, placing the data in the sitespeedio folder inside the container (**start.sh**):

~~~
#!/bin/bash

export NODE_ENV=production
export REDIS_HOST=****
export REDIS_QUEUES=****
export REDIS_PASSWORD=****
export REDIS_RESULT_QUEUE=****

export S3_ACCESS_KEY_ID=****
export S3_SECRET_ACCESS_KEY=****
run.sitespeed.io-worker nyc /home/root/sitespeedio/
~~~


And start the container:
~~~
docker run --privileged --restart="always" --name worker -v /tmp:/var/log/sitespeed.io -v /root/start.sh:/usr/local/bin/start.sh -d soulgalore/run.sitespeed.io-worker
~~~
