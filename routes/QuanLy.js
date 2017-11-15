var express = require('express');
var sql = require("../model/sql.js");
var path = require('path');


var router = express.Router();
router.use(express.static("public"));

router.get("/ThongKe",isLoggedIn,function (req,res) {
  sql.getNumberProducts(null,null,function(err,results){
    console.log(results);
    res.render("thongKe",{results:results});
  });
  // res.render("thongKe",{});
});

router.post("/LoadChart",function (req,res) {
  console.log(req.body);
  sql.getNumberProducts(req.body,null,function(err,results){

    console.log("hihi");
    console.log(results);
    res.send(results);
  });
  // res.render("thongKe",{});
});

module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    return next();
  }
  res.redirect('/');
}

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
