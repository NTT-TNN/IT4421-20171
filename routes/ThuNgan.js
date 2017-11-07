var express = require('express');
var sql = require("../model/sql.js");

var router = express.Router()

router.get("/",function(req,res){
  res.render("banhang");
});

router.post("/thanhToan",function(req,res){
  sql.insertDonHang(req.body,null,function (error,result) {
      res.send({status:"Success"});
  })

});

module.exports = router;
