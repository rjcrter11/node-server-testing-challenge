const express = require("express");
const server = express();
const catsRouter = require("../cats/cats-router");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up " });
});

server.use("/api/cats", catsRouter);

module.exports = server;
