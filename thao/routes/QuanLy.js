var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var path = require('path');
var authen = require("../routes/authen.js");


var router = express.Router();
router.use(express.static("public"));

router.get("/ThongKe",authen.isManager,function (req,res) {
  DonHang.getNumberProducts(null,null,function(err,results){
    user.getUSer(req.user[0].iduser,null,function(err,user){
      res.render("thongke",{
        results:results,
        user:user
      });
    });

  });
  // res.render("thongKe",{});
});

router.get("/QuanLyNhanVien",authen.isManager,function (req,res) {
    user.getEmployees(null,null,function(err,results){
    user.getUSer(req.user[0].iduser,null,function(err,user){
      res.render("quanlynv",{
        employees:results,
        user:user
      });
    });

  });
});

router.post("/LoadChart",function (req,res) {
  console.log(req.body);
  DonHang.getNumberProducts(req.body,null,function(err,results){

    // console.log("hihi");
    // console.log(results);
    res.send(results);
  });
  // res.render("thongKe",{});
});

//ham quan ly nhan vien

router.post("/add_emp", function(req, res) {
  user.insertEmployee(req.body,null, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
  });
  res.send();

});

router.post("/edit_emp", function(req, res) {
  user.updateEmployee(req.body,null, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
  });
  res.send();

});

router.post("/delete_emp", function(req, res) {
  user.deleteEmployee(req.body,null, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
  });
  res.send();
});

router.get("/search_emp",authen.isManager,function (req,res) {
    user.searchEmployees(req.body.info,null,function(err,results){
    user.getUSer(req.user[0].iduser,null,function(err,user){
      res.render("quanlynv",{
        employees:results,
        user:user
      });
    });
  });
});
//end

module.exports = router;
