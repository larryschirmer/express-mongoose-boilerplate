const { db_host } = require('../config');

const DBHOST = db_host;
const DBPORT = 27017;
const DBURL = db => `mongodb://${DBHOST}:${DBPORT}/${db}`;

module.exports = {
  DBURL,
};
