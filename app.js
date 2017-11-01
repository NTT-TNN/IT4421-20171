
var express = require("express");
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
require('./routes/socket.js')(io);

app.use('/BoiBan', BoiBan);
app.use('/ThuNgan', ThuNgan);

server.listen(port,function(){
  console.log("App running at port",port);
});
