statsd-rethinkdb-backend
======================

A backend plugin for [Statsd](https://github.com/etsy/statsd/) to forward
flush events to [RethinkDB](http://www.rethinkdb.com/).

## Overview

Suppose you wanted to use StatsD as your main event stream aggregator due
to its simple interface and its ease of integration with existing services.
Perfect! Unfortunately, StatsD does not persist events or metrics for
historical analysis. Enter RethinkDB.

## Installation

In your StatsD installation folder, run:

```bash
$ npm install statsd-rethinkdb-backend
```

Include the backend in your `config.js` file (see example configuration file below
for complete configuration example).

```json
{
  "backends": ["statsd-rethinkdb-backend"]
}
```

## Configuration

There are several configuration options that are available for this backend.

#### `package`

Allows you to specify which version of the `rethinkdb` module that is used to
perform RethinkDB operations. Each version of RethinkDB requires its clients to
be the same version.

#### `host`, `port`

Include the `host` and `port` where your RethinkDB instance is running.

#### `db`, `table`

Include the database name and table where you want the metrics stored.

#### `debug`

Set to true to get some logging included.

## Example Configuration

```js
{
  backends: ["statsd-rethinkdb-backend"],

  rethinkdb: {
    package: require('rethinkdb'),
    host: "localhost",
    port: 28105,
    db: "some_database",
    table: "some_table",
    debug: true
  }
}
```

## Contributing

Feel free to [leave issues here](https://github.com/joshgummersall/statsd-rethinkdb-backend/issues)
or fork the project and submit pull requests. If there is a feature you would like added
just submit an issue describing the feature and I will do my best.
