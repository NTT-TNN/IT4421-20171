var mysql = require('mysql');
var moment = require('moment');
var config = require('./config')
var connection = mysql.createConnection(config.config);

var getProducts=function(param1,param2,callback){
    connection.query('SELECT * FROM products',function(error,result){
        console.log(result);
        callback(null,result);
    });
}



 module.exports ={
    getProducts
 };
