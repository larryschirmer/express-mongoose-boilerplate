const express = require('express');
const route = express.Router();
const { removeDocument } = require('../database/api/data');

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isValidId(id)) {
      await removeDocument(id);
      res.send(data);
    }

    res.status(400).send({ error: true, message: 'invalid id' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
