var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thao123",
    database: "test_it4421"
});

var insertDonHang = function(param1,param2,callback){
  var datetime = moment(new Date()).format("YYYY-MM-DD");
  console.log(datetime);
  var orderID;
  var commandGetMaxID="SELECT MAX(orderID) as orderID FROM `order`;";
  connection.query(commandGetMaxID,function(error,result){
    if(error) throw error;
    orderID=result[0].orderID;
    console.log(orderID);
    var insertOrder="INSERT INTO `test_it4421`.`order` (`EmployeeID`, `OrderDate`, `CustomerID`,`TableID`) VALUES ('1','"+datetime+"', '1',"+param1[0].tableID+");";
    connection.query(insertOrder,function(error,result){
      console.log(insertOrder);
    });
    for(var i=1;i<param1.length;++i){
        var insertOrderdetails="insert into orderdetails (ProductID,Quantity,Order_OrderID) values("+param1[i].ProductID+","+param1[i].number+","+orderID+");";
        console.log(insertOrderdetails);
        connection.query(insertOrderdetails,function(error,result){
          if(error) throw error;
          if(i==(param1.length-1)){
            console.log("sssssss");
            callback(null,result);
          }
        });
    }
  });

}

module.exports ={
   insertDonHang
};
