var express = require('express');
var DoUong = require("../model/DoUong.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");


var router = express.Router();


router.get("/",authen.isOrder,function (req,res) {
  console.log(req.user[0]);
  DoUong.getProducts(null, null, function(err, products){
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("menu", {
        products: products,
        user: user
      });
    });
  })
});

module.exports = router;
