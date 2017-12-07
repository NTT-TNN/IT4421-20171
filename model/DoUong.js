var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19051996",
    database: "test_it4421"
});

var getProducts=function(param1,param2,callback){
    connection.query('SELECT * FROM products',function(error,result){
        console.log(result);
        callback(null,result);
    });
}



 module.exports ={
    getProducts
 };
