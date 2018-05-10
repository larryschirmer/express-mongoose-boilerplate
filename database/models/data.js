const mongoose = require('mongoose');
const { Schema } = mongoose;
const { DBURL } = require('./configuration');

mongoose.connect(DBURL('Documents'));

const dataSchema = new Schema({
  data: [
    {
      docID: String,
      edited: Boolean,
      title: String,
      author: String,
      likes: Number,
      body: String,
    },
  ],
  createdAt: Date,
});

const Data = mongoose.model('microblog', dataSchema);

module.exports = Data;
