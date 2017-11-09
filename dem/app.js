var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var db = require("./model/sql.js");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = process.env.port | 8000;
var index = require('./routes/index');
var DK_BoiBan = require('./routes/DK_BoiBan.js');
var DK_ThuNgan = require('./routes/DK_ThuNgan.js');
var info = require('./routes/info.js');

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
require('./routes/socket.js')(io);
app.use('/DK_BoiBan', DK_BoiBan);
app.use('/DK_ThuNgan', DK_ThuNgan);
app.use('/user_info', info);


db(function(err, con) {
  if (err) {
    throw (err);
  }
  app.post('/user_info', function(req, res) {
    console.log("ok post");
    // console.log(req.body);
    data = {
      fullname: req.body.name,
      gender: req.body.gender,
      birthday: req.body.birthday,
      email: req.body.email,
      phonenumber: req.body.phone,
      type: req.body.position,
      add: req.body.diachi
    };
    var sqlquery = "UPDATE user SET fullname = '" + req.body.name + "', gender = '" + req.body.gender + "',birthday = '" + req.body.birthday + "', email ='" + req.body.email + "',phonenumber = '" + req.body.phone + "',type ='" + req.body.position + "', address = '" + req.body.diachi + "' WHERE iduser =1"
    console.log(sqlquery);
    con.query(sqlquery, function(err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
    // console.log(data);
    con.query("SELECT * FROM user", function(err, results, fields) {
      if (err) throw err;
      console.log(results);
      res.render("user_info", {
        user: results
      });
    });
  });
});

server.listen(port, function() {
  console.log("App running at port", port);
});
