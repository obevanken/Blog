require('dotenv').config();
var express = require("express");
var app = express();
var body_parser = require("body-parser");
var db = require("./models");
var routes = require('./routes')();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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
