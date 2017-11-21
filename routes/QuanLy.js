var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var path = require('path');
var authen = require("../routes/authen.js");
var products_sql = require("../model/Products.js");


var router = express.Router();
router.use(express.static("public"));

router.get("/ThongKe", authen.isManager, function(req, res) {
  DonHang.getNumberProducts(null, null, function(err, results) {
    user.getUSer(req.user[0].iduser, null, function(err, user) {
      res.render("thongke", {
        results: results,
        user: user
      });
    });

  });
});

router.get("/QuanLyNhanVien", authen.isManager, function(req, res) {
  user.getUSer(req.user[0].iduser, null, function(err, user) {
    res.render("quanlynv", {
      user: user
    });
  });
});
router.get("/QuanLyDoUong", authen.isManager, function(req, res) {
  products_sql.getProducts(null, null, function(err, results) { //Goi den ham getProducts (return results) cua Model Product

    user.getUSer(req.user[0].iduser, null, function(err, user) {
      res.render("quanlydouong", {
        products: results,
        user: user
      });
    });

  });
});

router.post("/add", function(req, res) {
  console.log("ket qua gui len");
  console.log(req.body);
  products_sql.insertProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
    products_sql.getProduct(result, null, (rs) => {
      console.log("ket qua query" + result);
      console.log(rs[0]);
      res.send(rs[0]);
    })

  })

})
router.post("/edit", function(req, res) {
  console.log(req.body);
  products_sql.editProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
    console.log(result);
  })
  res.send()
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

    // console.log("hihi");
    // console.log(results);
    res.send(results);
  });
  // res.render("thongKe",{});
});

module.exports = router;
