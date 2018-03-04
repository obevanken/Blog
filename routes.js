var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth');
}

var isAuth = function (req, res, next){
  if (req.isAuthenticated()){
    res.redirect('/');
  }
  return next();
}

module.exports = function (passport) {

  router.get("/register", isAuth, (req, res) => {
    res.render("register", {
      messages: req.flash('message')
    })

  })

  router.post("/register", passport.authenticate('register', { successRedirect: '/auth',
                                     failureRedirect: '/register',
                                     failureFlash: true }));

  router.get("/auth",isAuth, (req, res) => {
    res.render("auth", {
      messages: req.flash('message')
    });
  })

  router.post('/auth',passport.authenticate('auth', { successRedirect: '/',
                                       failureRedirect: '/auth',
                                       failureFlash: true }));


  router.get("/", isAuthenticated, (req, res) => {
    res.sendStatus("404");
  })

  router.get("/post/:id", isAuthenticated, (req, res) => {
    res.sendStatus(404);
  })

  router.get("/post/new", isAuthenticated, (req, res) => {
    res.sendStatus(404);
  })

  router.post("/post/new", isAuthenticated, (req, res) => {
    res.sendStatus(404);
  })

  router.get("/author/:id", isAuthenticated, (req, res) => {
    res.sendStatus(404);
  })

    return router;
}
