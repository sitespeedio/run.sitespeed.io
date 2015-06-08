# run.sitespeed.io

Welcome to the online version of sitespeed.io. The first version of the project was sponsored by the [Swedish Internet Foundation](https://www.iis.se/english/).

The online version uses the [sitespeed.io Docker container](https://registry.hub.docker.com/u/sitespeedio/sitespeed.io/) to test your site.

Want to test it? Surf to [https://run.sitespeed.io](https://run.sitespeed.io)

## Components
There are three components:
 * [server](https://github.com/sitespeedio/run.sitespeed.io/tree/master/server) - the server component serves the frontend
 * [receiver](https://github.com/sitespeedio/run.sitespeed.io/tree/master/receiver) - the receiver receives messages from the worker(s).
 * [worker](https://github.com/sitespeedio/run.sitespeed.io/tree/master/worker) - the worker receives messages and analyzes pages using the sitespeed.io container.

Yep, actually it is not more complicated than that.


## Deploying your own version
Well, there's not so much to win to deploy your own version :) If you really care of the performance of your site you should setup your own [Open Source Performance Dashboard](http://dashboard.sitespeed.io/dashboard/db/information)
