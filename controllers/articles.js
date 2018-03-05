var db = require("../models");
var sanitizeHtml = require('sanitize-html');
var joi = require("joi");

module.exports.create = async (req, res, done) => {
  try{

    var schema = joi.object().keys({
      title: joi.string().min(5).max(30),
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
    await res.redirect("/post/" + result.id);
    await console.log(result)
  } catch (err){
    console.error(err);
    await done(null, false, req.flash('message', err.details[0].message));
    await res.redirect("/post/new");
  }
}

module.exports.findAll = async (req, res) => {
  try {
    var perPage = 10;
    var page = req.params.page || 1

    var count = await db.articles.count();

    var result = await db.articles.findAll({
      include: [{
        model: db.users
      }],
      offset: ((perPage * page) - perPage),
      limit: perPage
    });

    await res.render("home", {
      current: page,
      pages: Math.ceil(count / perPage),
      docs: result,
      user: req.user,
      next: Number(page) + 1,
      previous: page - 1
    })
  } catch (err) {
    console.error(err);
  }
}

module.exports.findOne = async (req,res) => {
  try{
    var result = await db.articles.findOne({
        include: [{
          model: db.users
        }],
        where:{
          id: req.params.id
        }
      })
    if(req.user.id == result.user_id || req.user.admin == true){
      res.render("adm_article", {
        doc: result,
        user: req.user
      });
    } else{
      res.render("article", {
        doc: result,
        user: req.user,
      })
    }
  } catch(err){
    console.error(err);
  }
}
