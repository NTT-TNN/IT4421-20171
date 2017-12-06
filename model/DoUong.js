var mysql = require('mysql');
var moment = require('moment');
const connection = require('./sql.js')

var getProducts=function(param1,param2,callback){
    connection.query('SELECT * FROM products',function(error,result){
        console.log(result);
        callback(null,result);
    });
}



 module.exports ={
    getProducts
 };
