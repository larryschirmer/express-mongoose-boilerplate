const express = require('express');
const route = express.Router();
const { getDocument, isValidId } = require('../database/api/data');

route.get('/', async (req, res) => {
  try {
    const { id } = req.query;

    if (isValidId(id) || id === undefined) {
      const db_res = await getDocument(id);
      res.send(db_res);
      return;
    }

    res.status(400).send({ error: true, message: 'invalid id' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
