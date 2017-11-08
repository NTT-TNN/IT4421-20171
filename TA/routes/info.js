var express = require('express');
var db = require("../model/sql.js");

var router = express.Router()

router.get("/",function(req,res){
  res.render("user_info");
});

module.exports = router;
