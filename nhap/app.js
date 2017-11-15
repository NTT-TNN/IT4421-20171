
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
var port= process.env.port | 9000;
var index = require('./routes/index');
var DK_BoiBan = require('./routes/DK_BoiBan.js');
var DK_ThuNgan = require('./routes/DK_ThuNgan.js');
var DK_QuanLy = require('./routes/DK_QuanLy.js')
require('./routes/socket.js')(io);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/DK_BoiBan', DK_BoiBan);
app.use('/DK_ThuNgan', DK_ThuNgan);
app.use('/DK_QuanLy', DK_QuanLy)
app.get('/', function(req, res){
  res.send('Hello')
})

server.listen(port,function(){
  console.log("App running at port",port);
});
