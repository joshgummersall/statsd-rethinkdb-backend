import _ from 'lodash';
import async from 'async';
import rethinkdb from 'rethinkdb';
import util from 'util';

export default class RethinkDB {
  constructor(startupTime, config, emitter) {
    this.config = config.rethinkdb;
    this.connection = null;
    emitter.on('flush', _.bind(this.onFlush, this));
  }

  // Ensure we are connected to a Rethink database
  // Callback signature should look like `function(err, connection) {}`
  connect(callback) {
    // Early return if we are already connected
    if (this.connection) {
      return callback(null, this.connection);
    }

    // Connect and set self connection
    rethinkdb.connect({
      host: this.config.host,
      port: this.config.port
    }, (err, connection) => {
      if (err) {
        return callback(err);
      }

      if (connection) {
        this.log('connected');
        this.connection = connection;
      }

      callback(null, this.connection);
    });
  }

  // Log to stdout if the debug flag is set
  log(string) {
    if (this.config.debug) {
      util.log('[rethinkdb]: ' + string);
    }
  }

  // Note: RethinkDB is very picky about keys mapped to `undefined`.
  // That's why we stringify and then parse the metrics
  buildDocument(timestamp, metrics) {
    return JSON.parse(JSON.stringify({
      timestamp: new Date(timestamp),
      metrics: metrics
    }));
  }

  onFlush(timestamp, metrics) {
    async.waterfall([
      (callback) => {
        this.connect(callback);
      },

      (connection, callback) => {
        rethinkdb
          .db(this.config.db)
          .table(this.config.table)
          .insert(this.buildDocument(timestamp, metrics))
          .run(connection, callback);
      }

    ], (err, results) => {
      if (err) {
        throw err;
      }

      this.log('published metrics');
    });
  }
}
