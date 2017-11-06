var express = require('express');
var db = require("../model/sql.js");

var router = express.Router()

router.get("/",function(req,res){
  res.render("banhang");
});

router.post("/thanhToan",function(req,res){
  console.log('body: ' + JSON.stringify(req.body));
  res.send({status:"Success"});
});

module.exports = router;
