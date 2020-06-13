const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("articleInfo", articleSchema);
