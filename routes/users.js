var express = require('express');
var sql = require("../model/sql.js");
var passport=require('passport');

// var bodyParser = require('../model/body-parser')
var router = express.Router()
router.use(express.static("public"));

router.get('/',Authorization, function(req, res, next) {
  // console.log("Tên req",req.user);
  sql.getUSer(null,null,function(err,results){
    // console.log(results);
    res.render("user_info",{user:results});
  });
});

router.get("/user_info",isLoggedIn,function (req,res) {
    sql.getUSer(null,null,function(err,results){
      // console.log(results);
      res.render("user_info",{user:results});
    });

});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/users/',
  failureRedirect: '/',
  failureFlash: true,
}))


router.post('/user_info', function(req, res) {
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
    // console.log(results);
  });

  // console.log(data);
  sql.getUSer(null,null,function(err,results){
    res.render("user_info",{user:results});
  });
});

router.get('/logout',function(req,res){
  req.logout();
  // login=false;
  res.redirect('/');
})

module.exports = router;

function Authorization(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="manager"){
        res.redirect('/QuanLy/ThongKe');
        // res.render('thongKe',{
        //   message1:"req.flash('loginMessage')",
        //   message2:"req.flash('signupMessage')",
        //   user:req.user[0],
        // });
      }else if(req.user[0].type=="order"){
        res.redirect('/BoiBan');
      }else{
        res.redirect('/ThuNgan');
      }
    }
    return next();
  }
  res.redirect('/');
}

function Authentication (req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    res.redirect('/users/user_info');
  }
  res.redirect('/');
}

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    return next();
  }
  res.redirect('/');
}
