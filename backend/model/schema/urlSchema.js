const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

urlSchema.plugin(uniqueValidator);

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
