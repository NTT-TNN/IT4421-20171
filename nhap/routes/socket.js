module.exports = function(io) {
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
};
