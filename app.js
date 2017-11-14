
var express = require("express");
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
require('./config/passport')(passport);

var app = express();
// require('./config/passport')(passport);
app.use(session({ secret: 'it4421',resave: true, saveUninitialized:true})); // session secret
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
var users = require('./routes/user.js');
var index = require('./routes/index.js');

require('./routes/socket.js')(io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/BoiBan', BoiBan);
app.use('/ThuNgan', ThuNgan);
app.use('/QuanLy', QuanLy);
app.use('/users', users);
app.use('/', index);



server.listen(port,function(){
  console.log("App running at port",port);
});
