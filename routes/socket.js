// var mysql = require('mysql');
// var moment = require('moment');
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "akonakon",
//   database: "test_it4421"
// });
var DonHang = require("../model/DonHang.js");


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
      new_order = [];
      // console.log(data.cafe +" " + data.suachua);
      // console.log('to id: ', banhang[0]);
      console.log("don hang chuyen sang", data);
      DonHang.insertOrder(data,function(err,res){
        DonHang.getOrder(res.insertId,function(list_products,info){
          id={
            order_id: res.insertId
          }
          new_order.push(id);
          new_order.push(info);
          new_order.push(list_products);
          console.log(new_order);
          io.emit("order",new_order);
        })
      });

    });
    //...
    socket.on('disconnect', function() {
      banhang = [];
      console.log('socket disconnect');
    })
  });
};
