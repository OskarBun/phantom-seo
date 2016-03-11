'use strict';

/*
Express SPA SEO
Adapted from https://github.com/meanjs/mean-seo
*/

/*
Module dependencies.
*/
var useragent = require('express-useragent'),
	_ = require('lodash'),
	browser = require('./browser'),
	Cache = require('./cache');

/*
Module default options
*/
var defaultOptions = {
	cacheClient: 'disk',
	cacheDuration: 2 * 60 * 60 * 24 * 1000,
	cacheFolder: __dirname + '/../tmp/mean-seo/cache',
	timeout: 10000 // 10s
};

module.exports = function SEO(options) {
	//Initialize local variables
	options = _.merge(defaultOptions, options || {});
	var cache = new Cache(options);

	return function SEO(req, res, next) {
		var source = req.headers['user-agent'],
			ua = useragent.parse(source);

		//If the request came from a crawler
		if (ua.isBot) {
			var url, key;

				// If the request is in HTML5 pushstate style.
				url = req.protocol + '://' + req.get('host') + req.originalUrl;
				// Use the url as the key.
				key = url;

			cache.get(key, function(err, page) {
				if (err) {
					//If not in cache crawl page
					browser.crawl(url, options.timeout, function(err, html) {
						if (err) {
							next(err);
						} else {
							//Save page to cache
							cache.set(key, html, function(err, res) {
								if (err) {
									next(err);
								}
							});

							//And output the result
							res.send(html);
						}
					});
				} else {
					//If page was found in cache, output the result
					res.send(page.content);
				}
			});
		} else {
			next();
		}
	};
};
