# Phantom SEO
SEO Solution for SPAs applications which forwards crawlers requests to a compiled HTML copy using PhantomJS.

Adapted from https://github.com/meanjs/mean-seo

## Quick Install
First you'll need to install phantom using npm:

	npm install OskarBun/phantom-seo --save

Then include in you express application:

	var seo = require('phantom-seo');

And finally, just before you require the **app.router** middleware add the following:

	app.use(seo({
		cacheClient: 'disk', // Can be 'disk' or 'redis'
    	redisURL: 'redis://:password@hostname:port', // If using redis, optionally specify server credentials
		cacheDuration: 2 * 60 * 60 * 24 * 1000, // In milliseconds for disk cache
		timeout: 10000 // In milliseconds for phantomjs to timeout for render
	}));

	// app.use(app.router) will be below this line

To be used with HTML5 pushstate
