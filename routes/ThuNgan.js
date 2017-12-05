var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");

var router = express.Router()

router.get("/",authen.isAccountant,function(req,res){
  user.getUser(req.user[0].iduser,null,function(err,user){
    DonHang.getOrder(function(list_orders, list_ids){
      console.log(list_orders);
      console.log(list_ids);
      res.render("banhang",{
        user:user,
        list_orders: list_orders,
        list_ids: list_ids
      });
    });
  });
});

router.post("/thanhToan",function(req,res){
  console.log(req.body);
  console.log("id cua thang thanh toan "+req.user);
  DonHang.insertDonHang(req.body,function (error,result) {
      console.log(" da chay ok");
  });
});

module.exports = router;
