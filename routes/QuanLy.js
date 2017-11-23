var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var path = require('path');
var authen = require("../routes/authen.js");
var products_sql = require("../model/Products.js");
var multer = require('multer');

var router = express.Router();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage
})

router.use(express.static("public"));

router.get("/ThongKe", authen.isManager, function(req, res) {
  DonHang.getNumberProducts(null, null, function(err, results) {
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("thongke", {
        results: results,
        user: user
      });
    });
  });
});

router.get("/QuanLyNhanVien", authen.isManager, function(req, res) {
  var position;
  user.getPosition(null,null , function(error,posi){
    // console.log("day la ket qua "+posi);
    position = posi;
  });
  user.getAllUSers(null,null, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user) {
        res.render("quanlynv", {
          allUsers:result,
          user: user,
          position : position
        });
      });
  });
});

router.post("/deleteUser",function(req,res){
  // console.log(req.body);
  user.deleteUser(req.body.userid,function(err,result){
    console.log("delete thanh cong");
  });
});

router.post("/addUser",function(req,res){
  user.insertUser(req.body,function(err,result){
    user.getUser(result.insertId,null,function(error,addedUser){
      res.send(addedUser);
    })
  });

});

router.get("/QuanLyDoUong", authen.isManager, function(req, res) {
  products_sql.getProducts(null, null, function(err, results) { //Goi den ham getProducts (return results) cua Model Product

    user.getUser(req.user[0].iduser, null, function(err, user) {
      console.log(results);
      res.render("quanlydouong", {
        products: results,
        user: user
      });
    });

  });
});

router.post("/add", upload.single('productImage'), function(req, res) {
  console.log("ket qua gui len");
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    const host = req.host;
    console.log(req.body);
    var filePath = req.file.path.slice(7);
    console.log(filePath);
    // console.log(test.slice(7));
    products_sql.insertProduct(filePath , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  }
});

router.post("/edit",upload.single('editProductImage') ,function(req, res) {
console.log("edit nhan");
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    products_sql.editProduct(null , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  } else {
    const host = req.host;
    console.log(req.body);
    var filePath = req.file.path.slice(7);
    console.log(filePath);
    products_sql.editProduct(filePath , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  }
})
router.post("/delete", function(req, res) {
  // console.log(req.body);
  products_sql.deleteProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
    // console.log(result);
  })
  res.send()
})


router.post("/LoadChart", function(req, res) {
  console.log(req.body);
  DonHang.getNumberProducts(req.body, null, function(err, results) {
    res.send(results);
  });
  // res.render("thongKe",{});
});

router.post("/editUser",function(req,res){
  console.log(req.body);
  user.editUser(req.body,function(err,rs){
  })
});

module.exports = router;
