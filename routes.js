var express = require('express');
var router = express.Router();
var articles = require("./controllers/articles");
var users = require("./controllers/users");

// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/auth');
// }

var isAuth = function (req, res, next){
  if (req.isAuthenticated()){
    res.redirect('/');
  }
  return next();
}

module.exports = function (passport) {

  router.post('/signout', function(req, res) {
   req.logout();
   res.redirect('/');
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


  router.get("/:page", articles.findAll);



  router.get("/post/new", (req, res) => {
    if(req.isAuthenticated()){
      res.render("newArticle",{
        messages: req.flash('message'),
        user: req.user
      });
    } else {
      res.redirect("/")
    }
  });

  router.post("/post/new", articles.create);

  router.get("/post/:id", articles.findOne);
  router.get("/post/:id/edit", articles.find_for_update);
  router.post("/post/:id/edit", articles.edit);
  router.get("/post/:id/delete", articles.delete);



router.get("/", (req,res) => {
  res.redirect("/1");
});



  router.get("/author/:id", users.find)

    return router;
}
