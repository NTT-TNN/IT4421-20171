var express = require('express');
var product = require("../model/DoUong.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");
var DonHang = require("../model/DonHang.js");


var router = express.Router();


router.get("/",authen.isOrder,function (req,res) {
  // console.log(req.user[0]);
  product.getProducts(null, null, function(err, products){
    user.getUser(req.user[0].iduser, null, function(error, user) {
      console.log("user: ", user );
      res.render("menu", {
        products: products,
        user: user
      });
    });
  })
});

router.get("/TKSP", function(req,res){
  // console.log(req.query.datasearch);
  product.searchProduct(req.query.typeahead, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("menu", {
        products:result,
        user: user
      });
    });
  });
});

router.get("/searchProduct" , function(req,res){
  product.searchProduct(req.query.key, function(err,result){
    var data= [];
    for(i=0;i<result.length;i++)
    {
      data.push(result[i].ProductName);
    }
      console.log(data);
      res.end(JSON.stringify(data));
    });
  });

  router.post("/order",function(req,res){
    DonHang.insertOrder(req.body,function(order,order_detail){
      res.send(order,order_detail);
    })
  });

module.exports = router;
