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
    var num = 0;
    var current = req.params.page || 1

    var count = await db.articles.count();

    var result = await db.articles.findAll({
      include: [{
        model: db.users
      }],
      offset: ((perPage * current) - perPage),
      limit: perPage
    });

    var pages = Math.ceil(count / perPage);

       if (current == 1){
         var num = 1
         } else {
           if( current == pages){
             var num = 2
           } else {
             var num = 3
           }
         }

         res.render("home",{
           page: current,
           previous: Number(current) - 1,
           next_page: Number(current) + 1,
           docs: result,
           flag: num,
           user: req.user
         })
       } catch (err) {
    console.error(err);
  }
}

module.exports.findOne = async (req,res) => {
  try{
    var schema = joi.object().keys({
      title: joi.string().min(5).max(30),
      text: joi.string().min(20).max(150)
    });

    var valid = await joi.validate({
      title: req.body.title,
      text: req.body.text,
    }, schema);

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

module.exports.find_for_update = async (req, res) => {
  try {
    var result = await db.articles.findOne({
      where: {
        id: req.params.id
      }
    })

    res.render("article_edit", {
      doc: result,
      messages: req.flash('message'),
      user: req.user
    })

  } catch (err) {
    console.log(err);
  }
}

module.exports.edit = async (req, res) =>{
  try{
    var result = await db.articles.update({
        title: req.body.title,
        text: req.body.text
      },{
        where: {
          id: req.params.id
        }
      })

    await res.redirect("/post/" + req.params.id );

  } catch(err){
    console.log(err);
    await done(null, false, req.flash('message', err.details[0].message));
    await res.redirect("/post/" + req.params.id + "/edit");
  }
}

module.exports.delete = async (req, res) => {
  try {

    var del = await db.articles.destroy({
      where: {
        id: req.params.id
      }
    });
    console.log(del);

    await res.redirect("/")

  } catch (err) {
    console.error(err);
  }
}
