var mysql = require('mysql');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "akonakon",
    database: "c"
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
