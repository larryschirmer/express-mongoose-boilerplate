const mongoose = require('mongoose');
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

module.exports = {
  getDocument,
  saveDocument,
  removeDocument,
  isValidId,
};
