
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port= process.env.port | 8000;
var index = require('./routes/index');
var DK_BoiBan = require('./routes/DK_BoiBan.js');
var DK_ThuNgan = require('./routes/DK_ThuNgan.js');

app.use('/DK_BoiBan', DK_BoiBan);
app.use('/DK_ThuNgan', DK_ThuNgan);

server.listen(port,function(){
  console.log("App running at port",port);
});





var order = [];
var banhang = [];
io.on("connection",function (socket){
  console.log("co thang nao da vao id cua no la: " + socket.id);
  socket.on('name' , function(data) {
    // console.log('name event: ', data, '- id: ', socket.id);
    if (data.name === 'order') {
      order.push(socket.id);
    } else {
      banhang.push(socket.id);
    }
  });
  socket.on("id_ban",function(data){
    // console.log(data.cafe +" " + data.suachua);
    // console.log('to id: ', banhang[0]);
    io.emit("du_lieu",data);
  });
  //...
  socket.on('disconnect', function() {
    banhang = [];
    console.log('socket disconnect');
  })
});
