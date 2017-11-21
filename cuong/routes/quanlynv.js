var express = require('express');
var products_sql = require("../model/Products.js");
var router = express.Router();

router.get("/",function (req,res){
  res.render("quanlynv");
});
