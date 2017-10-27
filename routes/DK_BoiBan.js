var express = require('express');
var sql = require("../model/sql.js");


var router = express.Router();


router.get("/",function (req,res) {
  sql.getProducts(null,null,function(err,results){
    console.log(results);
    res.render("menu",{products:results});
  });

});

module.exports = router;
