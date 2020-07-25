const express = require("express");
const app = express();
const cors = require("cors");

const HttpError = require("./model/http-error-model");
require("dotenv").config();
const bodyParser = require("body-parser");
const Url = require("./model/schema/urlSchema");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

require("./mongoose-connection/mongoose");

const urlRoute = require("./routes/urlRoute");
const counterRoute = require("./routes/counterRoute");

app.use("/counter", counterRoute);
app.use("/url", urlRoute);

app.use("/:shortUrl", async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  let url;
  try {
    url = await Url.findOne({ shortUrl });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Redirection failed, please try again"));
  }

  if (!url) {
    return next(new HttpError("Url not found, please check entered url"));
  }

  res.redirect(`https://${url.url}`);
});

app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({
      message: error.message || "An unknown error ocurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : ":(",
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening in the port " + process.env.PORT);
});
