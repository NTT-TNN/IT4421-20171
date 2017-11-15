var express = require('express');
var DonHang = require("../model/DonHang.js");

var router = express.Router()

router.get("/",Authorization,function(req,res){
  res.render("banhang");
});

router.post("/thanhToan",function(req,res){
  DonHang.insertDonHang(req.body,null,function (error,result) {
      res.send({status:"Success"});
  })

});

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
