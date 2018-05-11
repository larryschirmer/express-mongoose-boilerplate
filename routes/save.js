const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const { saveDocument, isValidDocument } = require('../database/api/data');

route.use(bodyParser.json());

route.post('/', async (req, res) => {
  try {
    const doc = req.body;
    const docValidation = isValidDocument(doc);

    if (docValidation === true) {
      const db_res = await saveDocument(doc);
      res.send(db_res);
      return;
    }

    res.status(400).send({ error: true, message: docValidation });
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
