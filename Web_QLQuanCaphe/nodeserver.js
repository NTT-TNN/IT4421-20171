var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
app.get("/cart",function (req,res) {
    res.render("cart")
});
app.get("/banhang",function(req,res){
  res.render("banhang");
});

io.on("connection",function (socket){
  console.log("co thang nao da vao id cua no la" + socket.id);
  socket.on("id_ban",function(data){
    console.log(data.cafe +" " + data.suachua);
    socket.broadcast.emit("du_lieu",data);
  });
});
