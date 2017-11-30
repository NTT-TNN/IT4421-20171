var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");

var router = express.Router()

router.get("/",authen.isAccountant,function(req,res){
  user.getUser(req.user[0].iduser,null,function(err,user){
    res.render("banhang",{user:user});
  });
});

router.post("/thanhToan",function(req,res){
  console.log(req.body);
  console.log("id cua thang thanh toan "+req.user);
  DonHang.insertDonHang(req.body,null,function (error,result) {
      console.log(" da chay ok");
  });
});

module.exports = router;
