const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

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

app.use(express.static(path.join("dist")));

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
    return res.send(`
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="The HTML5 template">
          <link rel="stylesheet" href="css/styles.css">
          <title>URL Shortener</title>
        </head>
        <style>
        html,
        body{
            margin : 0;
            padding : 0;
        }
        body{
            height : 100vh;
            width : 100%;
            display : flex;
            align-items : center;
            justify-content : center;
            flex-direction : column;
        }
        a{
            font-size : 1.6rem;
            margin : 1rem 0;
        }
        </style>
        <body>
        <h1> URL not found</h1>
        <a href="/">Back to home</a>
        </body>
        </html>
    `);
  }

  res.redirect(`https://${url.url}`);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error ocurred",
    stack: process.env.NODE_ENV === "development" ? error.stack : ":(",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening in the port " + process.env.PORT);
});
