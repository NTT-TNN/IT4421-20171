var express = require('express');
var sql = require("../model/sql.js");

// var bodyParser = require('../model/body-parser')
var router = express.Router()

router.get("/",function (req,res) {
    sql.getUSer(null,null,function(err,results){
      console.log(results);
      res.render("user_info",{user:results});
    });

});



router.post('/', function(req, res) {
  // console.log(req.body);
  data = {
    fullname: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    email: req.body.email,
    phonenumber: req.body.phone,
    type: req.body.position,
    add: req.body.diachi
  };
  sql.updateUser(req.body,null,function(err,results){
    console.log(results);
  });

  // console.log(data);
  sql.getUSer(null,null,function(err,results){
    console.log(results);
    res.render("user_info",{user:results});
  });
});


module.exports = router;
