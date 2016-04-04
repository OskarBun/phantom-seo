'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	childProcess = require('child_process'),
	phantomjs = require('phantomjs-prebuilt'),
	binPath = phantomjs.path;

/**
 * Initialize shell arguments
 */
var childArgs = [
	path.join(__dirname, 'phantomjs-scripts/crawl.js'),
	'/'
];

/**
 * Crawl the page
 */
exports.crawl = function(url, timeout, callback) {
	// Set the first argument to the url to crawl
	childArgs[1] = url;
	childArgs[2] = timeout

	// Call the PhantomJS process
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		callback(err, stdout);
	});
};
