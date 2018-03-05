require('dotenv').config();
var express = require("express");
var app = express();
var body_parser = require("body-parser");
var db = require("./models");
var flash = require("connect-flash");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
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
app.use(express.static('public'));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  var result = await db.users.findOne({
  where: {
    id: id
  }
})
done(null, result);
});

app.use('/', routes);
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
