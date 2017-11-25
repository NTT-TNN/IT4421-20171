var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19051996",
    database: "test_it4421"
});
module.exports = connection;

// connection.connect(function (err) {
//     if(err) console.log('hhhh');
//     console.log('bbb');

// })

// var getProducts=function(param1,param2,callback){
//     connection.query('SELECT * FROM Products',function(error,result){
//         callback(null,result);
//     });
// }
