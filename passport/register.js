var db = require('../models');
var LocalStrategy = require('passport-local').Strategy;
var joi = require('joi');

module.exports = function(passport) {
  passport.use('register', new LocalStrategy({
      passReqToCallback: true,
    },
  async function(req, username, password, done){

  try {

    var isPassword = req.body.isPassword;

    var schema = joi.object().keys({
      username: joi.string().alphanum().min(3).max(30).required(),
      password: joi.string().min(4).max(10).required(),
      email: joi.string().email().required()
    });

    var valid = await joi.validate({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }, schema);

    var result_username = await db.users.findOne({
      where: {
        username: req.body.username,
      }
    });

    var result_email = await db.users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (password != isPassword) {

      console.log("Пароль не повторился");
      return done(null, false, req.flash('message', 'Password not charged'))

    } else {

      if (result_username) {

        console.log("User already exists");
        return done(null, false, req.flash('message', 'User already exists.'))

      } else {

        if (result_email) {

          console.log("email already exists");
          return done(null, false, req.flash('message', 'Email already exists.'))

        } else {

          newUs = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          }

          var okes = await db.users.create(newUs);
          return done(null, okes, console.log(newUs));

        }
      }
    }
  } catch (err) {

    console.error(err);
    return done(null, false, req.flash('message', err.details[0].message))

  }
  }))
  }
