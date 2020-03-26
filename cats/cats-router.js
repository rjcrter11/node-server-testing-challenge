const express = require("express");
const router = express.Router();

const Cats = require("./cats-model");

router.get("/", (req, res) => {
  res.status(200).json({ message: "message from the cat router" });
});

module.exports = router;
