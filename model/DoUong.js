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
        console.log(result);
        callback(null,result);
    });
}



 module.exports ={
    getProducts
 };
