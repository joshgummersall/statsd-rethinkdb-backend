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
  "backends": ["./node_modules/statsd-rethinkdb-backend/index"]
}
```

## Configuration

There are several configuration options that are available for this backend.

#### `host`, `port`

Include the `host` and `port` where your RethinkDB instance is running.

#### `db`, `table`

Include the database name and table where you want the metrics stored.

#### `debug`

Set to true to get some logging included.

## Example Configuration

```json
{
  "backends": ["./node_modules/statsd-rethinkdb-backend/index"],

  "rethinkdb": {
    "host": "localhost",
    "port": 28105,
    "db": "some_database",
    "table": "some_table",
    "debug": true
  }
}
```

## Contributing

Feel free to [leave issues here](https://gitlab.com/joshgummersall/statsd-rethinkdb-backend/issues)
or fork the project and submit pull requests. If there is a feature you would like added
just submit an issue describing the feature and I will do my best.
