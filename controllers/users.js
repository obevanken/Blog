var db = require("../models");

module.exports.find = async (req, res) => {
  try{
    var result = await db.users.findOne({
      include: [{
        model: db.articles,
      }],
      where: {
        id: req.params.id
      },
      order: [
    [db.articles, 'createdAt', 'desc']
  ]
    })
    if(req.isAuthenticated()){
    await res.render("author",{
      doc: result,
      docs: result.articles,
      user: req.user
    });
  }else{
    await res.render("author2", {
      doc: result,
      docs: result.articles
    })
  }
  } catch(err){
    console.error(err);
  }
}
