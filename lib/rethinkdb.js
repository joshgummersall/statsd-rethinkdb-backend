'use strict';

var _ = require('underscore');
var rethinkdb = require('rethinkdb');

function Rethinkdb(startupTime, config, emitter) {
  emitter.on('flush', _.bind(this.onFlush, this));
};

Rethinkdb.prototype.onFlush = function(timestamp, metrics) {
  console.log('onFlush event');
};
