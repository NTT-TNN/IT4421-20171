var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var path = require('path');
var authen = require("../routes/authen.js");


var router = express.Router();
router.use(express.static("public"));

router.get("/ThongKe",authen.isManager,function (req,res) {
  DonHang.getNumberProducts(null,null,function(err,results){
    user.getUSer(req.user[0].iduser,null,function(err,user){
      res.render("thongKe",{
        results:results,
        user:user
      });
    });

  });
  // res.render("thongKe",{});
});

router.post("/LoadChart",function (req,res) {
  console.log(req.body);
  DonHang.getNumberProducts(req.body,null,function(err,results){

    // console.log("hihi");
    // console.log(results);
    res.send(results);
  });
  // res.render("thongKe",{});
});

module.exports = router;
