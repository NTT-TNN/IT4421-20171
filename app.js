
var express = require("express");
var bodyParser = require('body-parser');

var app = express();


app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port= process.env.port | 8000;
var index = require('./routes/index');
var BoiBan = require('./routes/BoiBan.js');
var ThuNgan = require('./routes/ThuNgan.js');
var QuanLy = require('./routes/QuanLy.js');
var user_info = require('./routes/User_info.js');


require('./routes/socket.js')(io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/BoiBan', BoiBan);
app.use('/ThuNgan', ThuNgan);
app.use('/QuanLy', QuanLy);
app.use('/user_info', user_info);

server.listen(port,function(){
  console.log("App running at port",port);
});
