
var express = require("express");
var app = express();
var mysql = require('mysql');
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port= process.env.port | 8000;

var conn = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "291096",
   database: "test_it4421"
 });

server.listen(port,function(){
  console.log("App running at port",port);
});

conn.connect(function(err) {
   if (err) throw err;
   app.get("/",function (req,res) {
       conn.query("SELECT * FROM Products", function (err, results, fields) {
         if (err) throw err;
         console.log(results);
         res.render("menu",{products:results});
       });

   });

 });

app.get("/banhang",function(req,res){
  res.render("banhang");
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
