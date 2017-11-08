var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thao123",
    database: "test_it4421"
});

var getProducts=function(param1,param2,callback){
    connection.query('SELECT * FROM Products',function(error,result){
        callback(null,result);
    });
}

var insertDonHang = function(param1,param2,callback){
  var commandGetMaxID="select max(OrderDetailID) from orderdetails;";
  connection.query(commandGetMaxID,function(error,result){
    if(error) throw error;
    console.log(result[0]);
  // callback(null,result);
  });
  OrderDetailID=4;
  // console.log(param1);
  var insertCommand1="INSERT INTO `test_it4421`.`order` (`EmployeeID`, `OrderDate`, `CustomerID`,`TableID`) VALUES ('1', '2017-07-11', '1',"+param1[0].tableID+");";
  connection.query(insertCommand1,function(error,result){
    console.log("insert");
  callback(null,result);
  });
  for(var i=1;i<param1.length;++i){
      var insertCommand2="insert into orderdetails (ProductID,Quantity,Order_OrderID) values("+param1[i].ProductID+","+param1[i].number+",1);";
      OrderDetailID++;
      console.log(insertCommand2);
      connection.query(insertCommand2,function(error,result){
        if(error) throw error;
        console.log("insert");
      // callback(null,result);
      });
  }



}

var getNumberProducts = function(param1,param2,callback){
  var Command1="SELECT sum(Quantity) as number,ProductID from orderdetails group by ProductID;";
  connection.query(Command1,function(error,result){
    if(error) throw error;
    // console.log(result);
    callback(null,result);
  });


}

 module.exports ={
    getProducts,
    insertDonHang,
    getNumberProducts
 };
