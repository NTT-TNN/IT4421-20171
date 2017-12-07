var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var authen = require("../routes/authen.js");

var router = express.Router()

router.get("/",authen.isAccountant,function(req,res){
  user.getUser(req.user[0].iduser,null,function(err,user){
    DonHang.getOrders(function(list_orders, list_ids){
      DonHang.currentOrder(function(current_orders, current_ids){
        res.render("banhang",{
          user:user,
          list_orders: list_orders,
          list_ids: list_ids,
          current_orders: current_orders,
          current_ids: current_ids
        });
      });
    });
  });
});

router.post("/thanhToan",function(req,res){
  console.log(req.body);
  console.log("id cua thang thanh toan "+req.user);
  DonHang.insertDonHang(req.body,function (error,result) {
      console.log(" da chay ok");
  });
});

router.post("/changeStatus",function(req,res){
  console.log(req.body);
  DonHang.changeStatus(req.body.order_id,req.body.iduser,function(err,result){
    DonHang.getOrder(req.body.order_id,function(list_products,info){
      var data = [];
      id={
        order_id: req.body.order_id
      }
      data.push(id);
      data.push(info);
      data.push(list_products);
      res.send(data);
    })
  })
})

module.exports = router;
