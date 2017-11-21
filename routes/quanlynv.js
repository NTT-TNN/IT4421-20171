var express=require('express');
var router = express.Router();
var user = require("../model/user.js");
var authen = require("../routes/authen.js");
router.use(express.static("public"));

router.get("/",function(req,res){
  res.render("quanlynv");
});

module.exports = router;
