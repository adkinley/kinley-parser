'use strict';

var _ = require('lodash');
var os = require('os');
var net = require('net');

// Get list of whoamis
exports.index = function(req, res) {

var output = {"ipaddress":null,"language":null,"software":null};
var faces = os.networkInterfaces();

var ipAddress = null
	Object.keys(faces).forEach(function (elt) {
		faces[elt].forEach(function (face) {
			if (face.family === 'IPv4' && !face.internal)
				ipAddress = face.address;
		});
	});


var language = req.headers["accept-language"];
	language = language.substr(0,language.search(","));


var user = req.headers["user-agent"];
var start = user.search(new RegExp(/\(/)) + 1; // extracting the contents in first set of parens
var end = user.search(new RegExp(/\)/)) ; 
var software = user.substr(start, end-start);
output.language = language;

output.ipaddress = ipAddress;

output.software = software;
  res.send(output);
};