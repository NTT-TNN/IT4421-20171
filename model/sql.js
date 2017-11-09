var mysql = require('mysql');
var moment = require('moment');
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
  var datetime = moment(new Date()).format("YYYY-MM-DD")
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
          console.log("insert");
        });
    }
  });
  // console.log(param1);




}

var getNumberProducts = function(param1,param2,callback){
  if(param1==null){
    Command1="SELECT sum(Quantity) as number,ProductName from orderdetails,products where orderdetails.ProductID=products.ProductID group by orderdetails.ProductID;";
  }else{
    Command1="SELECT sum(Quantity) as number,ProductName from orderdetails,products,`order`\
  where orderdetails.ProductID=products.ProductID and `order`.OrderDate between '"+param1.startDate+ "' and '"+param1.stopDate+ "' group by orderdetails.ProductID;";

  }
  console.log(Command1);
  connection.query(Command1,function(error,result){
    if(error) throw error;
    // console.log(result);
    callback(null,result);
  });


}

var getUSer = function(param1,param2,callback){
  connection.query('SELECT * FROM user',function(error,result){
      callback(null,result);
  });
}

var updateUser = function (param1,param2,callback) {
  connection.query("UPDATE user SET fullname = '" + param1.name + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phone + "',type ='" + param1.position + "', address = '" + param1.diachi + "' WHERE iduser =1",function(error,result){
      callback(null,result);
  });
}

 module.exports ={
    getProducts,
    insertDonHang,
    getNumberProducts,
    getUSer,
    updateUser
 };
