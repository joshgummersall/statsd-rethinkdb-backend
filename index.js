'use strict';

var Rethinkdb = require('./lib/rethinkdb');

exports.init = function(startupTime, config, events) {
  var rethinkInstance = new Rethinkdb(startupTime, config, events);
  return true;
};
