
var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thao123",
    database: "test_it4421"
});

var getNumberProducts = function(param1,param2,callback){
  if(param1==null){
    Command1="SELECT sum(Quantity) as number,ProductName from orderdetails,products where orderdetails.ProductID=products.ProductID group by orderdetails.ProductID;";
  }else{
    Command1="SELECT sum(Quantity) as number,ProductName from orderdetails,products,`order`\
  where orderdetails.ProductID=products.ProductID and `order`.OrderDate between '"+param1.startDate+ "' and '"+param1.stopDate+ "' group by orderdetails.ProductID;";

  }
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
    getNumberProducts,
    getUSer,
    updateUser
 };
