const mongoose = require('mongoose');
const Joi = require('joi');
const { filter } = require('graphql-anywhere');
const { Data } = require('../models');
const dataModel = require('./data.model');

const getDocument = async id => {
  try {
    let data;
    if (id) data = await Data.findOne({ _id: id });
    if (!id) data = await Data.findOne({}).sort('-createdAt');

    if (data == null) return { error: true, message: 'record not available' };
    return filter(dataModel, data);
  } catch (e) {
    console.log('getDocument');
    console.log(e);
  }
};

const saveDocument = async props => {
  const { data, createdAt } = props;

  const document = new Data({ data, createdAt });
  const doc = await document.save();

  if (!doc) return { error: 'could not save user information' };
  return { error: false, id: doc._id };
};

const removeDocument = async id => {
  await Data.findOneAndRemove({ _id: id });
};

const isValidId = id => {
  const { isValid } = mongoose.Types.ObjectId;
  return isValid(id);
};

const isValidDocument = doc => {
  const schema = Joi.object().keys({
    data: Joi.object().keys({
      docID: Joi.string().required(),
      edited: Joi.boolean().required(),
      title: Joi.string().required(),
      author: Joi.string().required(),
      likes: Joi.number()
        .integer()
        .min(0)
        .required(),
      body: Joi.string().required(),
    }),
    createdAt: Joi.date()
      .iso()
      .required(),
  });

  const { error } = Joi.validate(doc, schema);
  if (error) return error.details[0].message;
  return true;
};

module.exports = {
  getDocument,
  saveDocument,
  removeDocument,
  isValidId,
  isValidDocument,
};
