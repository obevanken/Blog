var express = require('express');
var router = express.Router();

module.exports = function () {
  router.get("/register", (req, res) => {
    res.sendStatus(404);
  })

  router.post("/register", (req, res) => {
    res.sendStatu(404);
  })

  router.get("/auth", (req, res) => {
    res.sendStatus(404);
  })

  router.post("/auth", (req, res) => {
    res.sendStatus(404);
  })

  router.get("/", (req, res) => {
    res.sendStatus("404");
  })

  router.get("/post/:id", (req, res) => {
    res.sendStatus(404);
  })

  router.get("/post/new", (req, res) => {
    res.sendStatus(404);
  })

  router.post("/post/new", (req, res) => {
    res.sendStatus(404);
  })

  router.get("/author/:id", (req, res) => {
    res.sendStatus(404);
  })

    return router;
}
