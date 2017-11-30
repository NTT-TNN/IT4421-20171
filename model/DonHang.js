var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akonakon",
  database: "test_it4421"
});

var insertDonHang = function(order, param2, callback) {
  var datetime = moment(new Date()).format("YYYY-MM-DD");
  console.log(datetime);
  var EmployeeID = order[order.length - 1].id;
  var tableID = order[0].tableID;
  var total = 0;
  for (var i = 1; i < order.length - 1; i++) {
    total += order[i].number * order[i].ProductPrice;
  }
  // var OrderID;
  var insertOrder = "INSERT INTO `order` (EmployeeID, OrderDate,TableID,Total) VALUES (" + EmployeeID + ",'" + datetime + "', " + tableID + "," + total + ");";
  console.log(insertOrder);
  connection.query(insertOrder, function(error, result) {
    console.log(result);
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

var getNumberProducts = function(param1, param2, callback) {
  if (param1 == null) {
    Command1 = "select sum(Quantity) as number,ProductName,products.ProductID from orderdetails,products,`order` where orderdetails.ProductID=products.ProductID group by orderdetails.ProductID , `order`.OrderDate,products.ProductName;";
    console.log(Command1);
  } else {
    console.log(param1);
    // Command1="SELECT sum(Quantity) as number,ProductName from orderdetails,products,`order`\
    // where orderdetails.ProductID=products.ProductID and `order`.OrderDate between '"+param1.startDate+ "' and '"+param1.stopDate+ "' group by orderdetails.ProductID;";
    Command1 = "select sum(Quantity) as number,ProductName ,products.ProductID,OrderDate from orderdetails,products,`order` where orderdetails.ProductID=products.ProductID and `order`.OrderID =orderdetails.OrderID and `order`.OrderDate >= '"+param1.startDate+"' and `order`.OrderDate <= '"+param1.stopDate+"' group by orderdetails.ProductID,`order`.OrderDate,products.ProductName;";
    console.log(Command1);
  }
  connection.query(Command1, function(error, result) {
    if (error) throw error;
    // console.log(result);
    callback(null, result);
  });
}

module.exports = {
  insertDonHang,
  getNumberProducts
};
