'use strict';

var _ = require('underscore');
var async = require('async');
var rethinkdb = require('rethinkdb');
var util = require('util');

function Rethinkdb(startupTime, config, emitter) {
  this.config = config.rethinkdb;
  this.connection = null;
  emitter.on('flush', _.bind(this.onFlush, this));
};

// Ensure we are connected to a Rethink database
// Callback signature should look like `function(err, connection) {}`
Rethinkdb.prototype.connect = function(callback) {
  var self = this;
  // Early return if we are already connected
  if (self.connection) {
    return callback(null, self.connection);
  }

  // Connect and set self connection
  rethinkdb.connect({
    host: self.config.host,
    port: self.config.port
  }, function(err, connection) {
    if (err) {
      return callback(err);
    }
    if (connection) {
      self.log('connected');
      self.connection = connection;
    }
    callback(err, self.connection);
  });
};

// Log to stdout if the debug flag is set
Rethinkdb.prototype.log = function(string) {
  if (this.config.debug) {
    util.log('[rethinkdb]: ' + string);
  }
};

// Note: RethinkDB is very picky about keys mapped to `undefined`.
// That's why we stringify and then parse the metrics
Rethinkdb.prototype.buildDocument = function(timestamp, metrics) {
  return JSON.parse(JSON.stringify({
    timestamp: new Date(timestamp),
    metrics: metrics
  }));
};

Rethinkdb.prototype.onFlush = function(timestamp, metrics) {
  var self = this;
  async.waterfall([
    function(callback) {
      self.connect(callback);
    },
    function(connection, callback) {
      rethinkdb
        .db(self.config.db)
        .table(self.config.table)
        .insert(self.buildDocument(timestamp, metrics))
        .run(connection, callback);
    }
  ], function(err, results) {
    if (err) throw err;
    self.log('published metrics');
  });
};

module.exports = Rethinkdb;
