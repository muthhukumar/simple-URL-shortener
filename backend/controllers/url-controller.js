const mongoose = require("mongoose");
const Url = require("../model/schema/urlSchema");
const Counter = require("../model/schema/counterSchema");
const { validationResult } = require("express-validator");
const encode = require("../util/encode-url");
const HttpError = require("../model/http-error-model");

const shortUrl = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, check and try again", 422)
    );
  }
  const { url } = req.body;

  let shortUrl;
  let counter;

  try {
    counter = await Counter.findOne({ cid: "counter" });
  } catch (err) {
    return next(new HttpError("Shortening url failed", 422));
  }
  if (!counter) {
    return next(new HttpError("Counter does not exist", 402));
  }

  shortUrl = encode(counter.count);

  const newUrl = new Url({
    url,
    shortUrl,
  });

  let response;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    response = await newUrl.save({ session: sess });
    counter.count += 1;
    await counter.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Something went wrong", 402));
  }

  res.json({ response, newUrl });
};

module.exports = shortUrl;
