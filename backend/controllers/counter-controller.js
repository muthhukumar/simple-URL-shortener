const HttpError = require("../model/http-error-model");
const Counter = require("../model/schema/counterSchema");

const newCounter = async (req, res, next) => {
  const newcounter = new Counter({
    count: 1000000,
  });
  let response;
  try {
    response = await newcounter.save();
  } catch (err) {
    return next(new HttpError("Something went wrong", 404));
  }
  res.json({ data: response });
};

const setCounter = async (req, res, next) => {
  const { cid, count } = req.body;

  let existingCounter;
  try {
    existingCounter = await Counter.findOne(cid);
  } catch (err) {
    return next(new HttpError("Setting counter failed, please try again", 402));
  }
  if (existingCounter) {
    return next(new HttpError("Counter already exist", 422));
  }

  const newCounter = new Counter({
    cid,
    count,
  });

  try {
    await newCounter.save();
  } catch (err) {
    return next(new HttpError("Setting counter failed, please try again", 402));
  }
  res.status(201).json({ newCounter });
};

module.exports = { newCounter, setCounter };
