var mysql = require('mysql');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "thao123",
    database: "test_it4421"
});

var getConnection = function (cb) {
     con.getConnection(function (err, connection) {
         //if(err) throw err;
         //pass the error to the cb instead of throwing it
         if(err) {
           return cb(err);
         }
         cb(null, connection);
     });
};
 module.exports = getConnection;
