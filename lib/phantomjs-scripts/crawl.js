'use strict';

/**
* Module dependencies
*/
var page = require("webpage").create(),
	system = require('system'),
	url = system.args[1],
	timeout = system.args[2];

/**
* PhantomJS script
*/


page.onCallback = function(data){
	console.log(page.content);
	phantom.exit();
}


page.open(url, function(status) {
	// If PhantomJS successfully crawled
	if (status !== "success") {
		console.log("===! Unable to access network\n");
	}

	setTimeout(function () {
		console.log(page.content);
		phantom.exit();
	}, timeout);
});
