var express = require('express');
var router = express.Router();

module.exports = function (passport) {
  router.get("/register", (req, res) => {
    res.render("register", {
      messages: req.flash('message')
    })
  })

  router.post("/register", passport.authenticate('register', { successRedirect: '/auth',
                                     failureRedirect: '/register',
                                     failureFlash: true }));

  router.get("/auth", (req, res) => {
    res.render("auth", {
      messages: req.flash('message')
    });
  })

  router.post('/auth',passport.authenticate('auth', { successRedirect: '/',
                                       failureRedirect: '/auth',
                                       failureFlash: true }));


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
