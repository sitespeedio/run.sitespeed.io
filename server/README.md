# The server

The serves the pages to the user and sends messages to worker(s) using the queue(s) when there's a new job.

Before starting a worker, make sure you have exported your [environment variables](https://github.com/sitespeedio/run.sitespeed.io/blob/master/setup.sh).


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

run.sitespeed.io-server
~~~

And start the container:
~~~
docker run --restart="always" --name sitespeed-server -p 3000:3000 -v /tmp:/var/log/sitespeed.io -v /root/server-start.sh:/home/root/scripts/start.sh -d soulgalore/run.sitespeed.io-server
~~~

The server also need to be able to contact a MySQL, Redis and should be behing NginX

### MySQL

~~~
docker run --name mysql -p 3306:3306 -v /data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mySuperSecretPassword -d mysql:5.7.7
~~~

### Redis

Make sure you have a copy of the Redis configuration on the right place.

~~~
docker run -v /root/redis.conf:/usr/local/etc/redis/redis.conf --name redis -p 6379:6379 -d redis:3.0.0 redis-server /usr/local/etc/redis/redis.conf
~~~

### NginX

~~~
docker run --name nginx -v /root/nginx.conf:/etc/nginx/nginx.conf:ro -v /root:/home/root/cert:ro -d -p 443:443 -p 80:80 nginx
~~~
