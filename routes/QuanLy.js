var express = require('express');
var sql = require("../model/sql.js");


var router = express.Router();


router.get("/",function (req,res) {
  sql.getNumberProducts(null,null,function(err,results){
    console.log(results);
    res.render("thongKe",{results:results});
  });
  // res.render("thongKe",{});
});

module.exports = router;
