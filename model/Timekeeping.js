var mysql = require('mysql');
var moment = require('moment');
const connection = require('./sql.js')

var getTimekeeping = function(callback){
  var current_date = new Date();
  var month = current_date.getMonth()+1;
  var year = current_date.getFullYear();
  var statement = "Select iduser, day(worked_day) as data from timekeeping where month(worked_day)="+month+" and year(worked_day)="+year;
  console.log(statement);
  connection.query(statement, function(error, result) {
    callback(null, result);
  });
}

var deleteTimekeeping = function(param, callback){
  var current_date = new Date();
  var date = current_date.getDate();
  var month = current_date.getMonth()+1;
  var year = current_date.getFullYear();
  var statement;
  if(param == null){
    statement = "delete from timekeeping where month(worked_day)="+month+" and year(worked_day)="+year;
  }else{
    statement = "delete from timekeeping where day(worked_day)>="+date+" and month(worked_day)="+month+" and year(worked_day)="+year;
  }
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}

var createTimekeeping = function (iduser, date, callback) {
    var current_date = new Date();
    var month = current_date.getMonth()+1;
    var year = current_date.getFullYear();
    var statement = "Insert into timekeeping (iduser,worked_day) VALUES ('"+iduser+"','"+year+"-"+month+"-"+date+"')";
    console.log(statement);
    connection.query(statement, function (error, result) {
        // console.log(result)
        callback(null, result);
    });
}

var getTotalWorkedDay = function (iduser, callback){
  var current_date = new Date();
  var month = current_date.getMonth()+1;
  var year = current_date.getFullYear();
  var statement = "SELECT count(idtk) as numOfDays FROM timekeeping where month(worked_day)="+month+" and year(worked_day)="+year+" group by iduser having iduser = "+iduser;
  console.log(statement);
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}

var getAllTotalWorkedDay = function (callback){
  var current_date = new Date();
  var month = current_date.getMonth()+1;
  var year = current_date.getFullYear();
  var statement = "SELECT iduser, count(idtk) as numOfDays FROM timekeeping where month(worked_day)="+month+" and year(worked_day)="+year+" group by iduser";
  console.log(statement);
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}



module.exports = {
  getTimekeeping,
  deleteTimekeeping,
  createTimekeeping,
  getTotalWorkedDay,
  getAllTotalWorkedDay
};
