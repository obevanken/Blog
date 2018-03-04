require('dotenv').config();
var express = require("express");
var app = express();
var body_parser = require("body-parser");
var db = require("./models");
var flash = require("connect-flash");
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes')(passport);
var auth = require("./passport/auth")(passport);
var register = require("./passport/register")(passport);

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey',
    resave :  true ,
    saveUninitialized :  true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var start = async () => {
  try{
    await db.sequelize.authenticate();
    await console.log("Сервак запущен");
    await db.sequelize.sync();
    await app.listen(3000);
  } catch(err) {
    console.error(err);
  }
}

start();
