const app = require('express')();

const get = require('./routes/get');
const save = require('./routes/save');
const remove = require('./routes/remove');

app.get('/', (_, res) => res.send('you have requested data from the root level'));

app.use('/get', get);
app.use('/save', save);
app.use('/remove', remove);

module.exports = app;
