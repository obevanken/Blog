var express = require('express');
var router = express.Router();
var articles = require("./controllers/articles");
var users = require("./controllers/users");

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

  router.post('/signout', function(req, res) {
   req.logout();
   res.redirect('/auth');
 });

  router.get("/register", isAuth, (req, res) => {
    res.render("register", {
      messages: req.flash('message')
    })
  });

  router.post("/register", passport.authenticate('register', { successRedirect: '/auth',
                                     failureRedirect: '/register',
                                     failureFlash: true }));

  router.get("/auth",isAuth, (req, res) => {
    res.render("auth", {
      messages: req.flash('message')
    });
  });

  router.post('/auth',passport.authenticate('auth', { successRedirect: '/1',
                                       failureRedirect: '/auth',
                                       failureFlash: true }));


  router.get("/:page", isAuthenticated, articles.findAll);



  router.get("/post/new", isAuthenticated, (req, res) => {
    res.render("newArticle",{
      messages: req.flash('message'),
      user: req.user
    });
  });

  router.post("/post/new", isAuthenticated, articles.create);

  router.get("/post/:id", isAuthenticated, articles.findOne);
  router.get("/post/:id/edit", isAuthenticated, articles.find_for_update);
  router.post("/post/:id/edit", isAuthenticated, articles.edit);
  router.get("/post/:id/delete", isAuthenticated, articles.delete);



router.get("/", isAuthenticated, (req,res) => {
  res.redirect("/1");
});



  router.get("/author/:id", isAuthenticated, users.find)

    return router;
}
