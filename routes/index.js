var express = require('express');
var DonHang = require("../model/DonHang.js");
var passport=require('passport');

var router = express.Router()

router.get('/', function(req, res, next) {
  if(req.user!=undefined){
    console.log(req.user);
  }

  res.render('index',{
    message : req.flash('loginMessage'),
    type:null,
    id:null,
    username:null
  });
});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/user/',
  failureRedirect: '/',
  failureFlash: true,
}))

module.exports = router;
