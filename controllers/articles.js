var db = require("../models");
var sanitizeHtml = require('sanitize-html');
var joi = require("joi");

module.exports.create = async (req, res, done) => {
  try{

    var schema = joi.object().keys({
      title: joi.string().alphanum().min(5).max(30),
      text: joi.string().min(20).max(150)
    });

    var valid = await joi.validate({
      title: req.body.title,
      text: req.body.text,
    }, schema);

    var clean_title = await sanitizeHtml(req.body.title);
    var clean_text = await sanitizeHtml(req.body.text);

    article = {
      title: clean_title,
      text: clean_text,
      user_id: req.user.id
    }
    var result = await db.articles.create(article);
    await res.redirect("/");
    await console.log(result)
  } catch (err){
    console.error(err);
    await done(null, false, req.flash('message', err.details[0].message));
    await res.redirect("/post/new");
  }
}
