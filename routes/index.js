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
    username:null,
  });
});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/user/',
  failureRedirect: '/',
  failureFlash: true,
}))

module.exports = router;
