import RethinkDB from './rethinkdb';

function init(startupTime, config, events) {
  const rethinkInstance = new RethinkDB(startupTime, config, events);
  return true;
}

export {init};
