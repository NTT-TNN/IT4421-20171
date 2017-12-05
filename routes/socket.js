var DonHang = require("../model/DonHang.js");
var express = require('express');
var router = express.Router();

module.exports = function(io) {
  var order = [];
  var banhang = [];

  io.on("connection",function (socket){
    // console.log("co thang nao da vao id cua no la: " + socket.id);
    socket.on('name' , function(data) {
      // console.log('name event: ', data, '- id: ', socket.id);
      if (data.name === 'order') {
        order.push(socket.id);
      } else {
        banhang.push(socket.id);
      }
    });

    socket.on("order",function(data){
      // console.log(data.cafe +" " + data.suachua);
      // console.log('to id: ', banhang[0]);
      console.log("don hang chuyen sang", data);
      DonHang.insertOrder(data, function(new_order, new_order_detail){
        console.log("new_order: ",new_order);
        console.log("new_order_detail:",new_order_detail);
      });
      io.emit("order",data);
    });
    //...
    socket.on('disconnect', function() {
      banhang = [];
      console.log('socket disconnect');
    })
  });
};
