var express = require('express');
var DonHang = require("../model/DonHang.js");
var passport=require('passport');

var router = express.Router()

router.get('/', function(req, res, next) {
  // console.log("Tên req",req.user);
  if(req.user!=undefined){
    console.log(req.user);
  }

  res.render('index',{
    message1:"req.flash('loginMessage')",
    message2:"req.flash('signupMessage')",
    type:null,
    id:null,
    user_name:null,
  });
});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/user/',
  failureRedirect: '/user',
  failureFlash: true,
}))

module.exports = router;
