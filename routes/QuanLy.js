var express = require('express');
var sql = require("../model/sql.js");
var path = require('path');


var router = express.Router();
router.use(express.static("public"));


router.get("/thongKe",function (req,res) {
  sql.getNumberProducts(null,null,function(err,results){
    console.log(results);
    res.render("thongKe",{results:results});
  });
  // res.render("thongKe",{});
});

router.post("/LoadChart",function (req,res) {
  console.log(req.body);
  sql.getNumberProducts(req.body,null,function(err,results){

    console.log("hihi");
    console.log(results);
    res.send(results);
  });
  // res.render("thongKe",{});
});

module.exports = router;
