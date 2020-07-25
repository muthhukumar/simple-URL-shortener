const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const shortUrl = require("../controllers/url-controller");

router.post("/shorturl", [check("url").not().isEmpty().isURL()], shortUrl);

module.exports = router;
