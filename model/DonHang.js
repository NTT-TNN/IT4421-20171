var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akonakon",
  database: "test_it4421"
});

var insertDonHang = function(order, callback) {
  var datetime = moment(new Date()).format("YYYY-MM-DD");
  console.log(datetime);
  var EmployeeID = order[order.length - 1].userid;
  var tableID = order[0].tableID;
  var total = 0;
  for (var i = 1; i < order.length - 1; i++) {
    total += order[i].number * order[i].ProductPrice;
  }
  // var OrderID;
  var insertOrder = "INSERT INTO `order` (EmployeeID, OrderDate,TableID,Total) VALUES (" + EmployeeID + ",'" + datetime + "', " + tableID + "," + total + ");";
  console.log(insertOrder);
  connection.query(insertOrder, function(error, result) {
    // console.log(result);
    // OrderID = result.insertId;
    for (var i = 1; i < order.length - 1; ++i) {
      var insertOrderdetails = "insert into orderdetails (OrderID,Quantity,ProductID) values(" +result.insertId+ "," + order[i].number + "," + order[i].ProductID + ");";
      // console.log(insertOrderdetails);
      connection.query(insertOrderdetails, function(error, result) {
        if (error) throw error;
        if (i == (order.length - 2)) {
          callback(null, result);
        }
      });
    }
  });
}

var insertOrder = function(order,callback){
  var datetime = moment(new Date()).format("YYYY-MM-DD");
  var EmployeeID = order[0].iduser;
  var tableID = order[0].tableID;
  var status = order[0].status;
  var total = 0;
  for (var i = 1; i < order.length; i++) {
    total += order[i].number * order[i].ProductPrice;
  }
  var Order = "INSERT INTO `order` (EmployeeID, OrderDate,TableID,Total,`Status`) VALUES (" + EmployeeID + ",'" + datetime + "', " + tableID + "," + total + ","+status+");";
  // console.log(Order);
  connection.query(Order, function(error, result) {
    // console.log(result.insertId);
    // OrderID = result.insertId;
    for (var i = 1; i < order.length; i++) {
      var Orderdetails = "insert into orderdetails (OrderID,Quantity,ProductID) values(" +result.insertId+ "," + order[i].number + "," + order[i].ProductID + ");";
      // console.log(insertOrderdetails);
      connection.query(Orderdetails, function(err, res) {
        if(err){
          throw error;
        }
        if (i == (order.length - 1)) {
          console.log("result: ",result);
          console.log("res:",res);
          callback(result, res);
        }
      });
    }
  });

}

var getNumberProducts = function(param1, param2, callback) {
  if (param1 == null) {
    Command1 = "select sum(Quantity) as number,ProductName,products.ProductID from orderdetails,products,`order` where orderdetails.ProductID=products.ProductID group by orderdetails.ProductID , `order`.OrderDate,products.ProductName;";
    console.log(Command1);
  } else {
    console.log(param1);

    Command1 = "select sum(Quantity) as number,ProductName ,products.ProductID,OrderDate from orderdetails,products,`order` where orderdetails.ProductID=products.ProductID and `order`.OrderID =orderdetails.OrderID and `order`.OrderDate >= '"+param1.startDate+"' and `order`.OrderDate <= '"+param1.stopDate+"' group by orderdetails.ProductID,`order`.OrderDate,products.ProductName;";
    console.log(Command1);
  }
  connection.query(Command1, function(error, result) {
    if (error) throw error;
    // console.log(result);
    callback(null, result);
  });
}

var getOrder = function(callback){
  var statement1 = "select orderdetails.OrderID,ProductName,Price,Quantity  from `order`, orderdetails, products where `order`.OrderID = orderdetails.OrderID and products.ProductID = orderdetails.ProductID and status <> 2";
  connection.query(statement1,function(err, list_orders) {
    if(err) throw error;
    var statement2 = "select orderdetails.OrderID, TableID, Status, Total  from `order`, orderdetails, products where `order`.OrderID = orderdetails.OrderID and products.ProductID = orderdetails.ProductID and Status <> 2 group by OrderID"
    connection.query(statement2,function(err2, list_ids){
      if(err2) throw error;
      callback(list_orders,list_ids);
    });
  });
}

module.exports = {
  insertDonHang,
  getNumberProducts,
  getOrder,
  insertOrder
};
