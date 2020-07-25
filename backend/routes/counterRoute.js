const express = require("express");
const router = express.Router();
const { setCounter, newCounter } = require("../controllers/counter-controller");

router.post("/setCounter", setCounter);
router.get("/", newCounter);

module.exports = router;
