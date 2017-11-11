var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "codai1296",
    database: "it4421"
});

var getProducts=function(param1,param2,callback){
    connection.query('SELECT * FROM Products',function(error,result){
        callback(null,result);
    });
}

module.exports ={
    getProducts,
 };
