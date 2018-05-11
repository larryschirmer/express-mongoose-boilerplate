const http = require('http');
const app = require('./masterRouter');

const server = http.Server(app);
server.listen(8080);
