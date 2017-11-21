var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");

var router = express.Router()

router.get("/",authen.isAccountant,function(req,res){
  user.getUSer(req.user[0].iduser,null,function(err,user){
    // console.log(results);
    // console.log(results);
    res.render("banhang",{user:user});
  });
});

router.post("/thanhToan",function(req,res){
  DonHang.insertDonHang(req.body,null,function (error,result) {
      res.send({status:"Success"});
  })

});

module.exports = router;
