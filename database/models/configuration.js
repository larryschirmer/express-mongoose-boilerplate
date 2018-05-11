const { db_host, db_port } = require('../config');

const DBHOST = db_host;
const DBPORT = db_port;
const DBURL = db => `mongodb://${DBHOST}:${DBPORT}/${db}`;

module.exports = {
  DBURL,
};
