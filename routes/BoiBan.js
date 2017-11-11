var express = require('express');
var DoUong = require("../model/DoUong.js");


var router = express.Router();


router.get("/",function (req,res) {
  DoUong.getProducts(null,null,function(err,results){
    console.log(results);
    res.render("menu",{products:results});
  });

});

module.exports = router;
