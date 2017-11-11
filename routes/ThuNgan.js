var express = require('express');
var DonHang = require("../model/DonHang.js");

var router = express.Router()

router.get("/",function(req,res){
  res.render("banhang");
});

router.post("/thanhToan",function(req,res){
  DonHang.insertDonHang(req.body,null,function (error,result) {
      res.send({status:"Success"});
  })

});

module.exports = router;
