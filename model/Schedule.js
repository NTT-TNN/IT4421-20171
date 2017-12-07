var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "291096",
    database: "test_it4421"
});

var createSchedule = function (iduser, date, callback) {
    var current_date = new Date();
    var month;
    if(current_date.getMonth()==11){
      month = 1;
    }else{
      month = current_date.getMonth()+2;
    }
    var year = current_date.getFullYear();
    var statement = "Insert into schedule (iduser,worked_day) VALUES ('"+iduser+"','"+year+"-"+month+"-"+date+"')";
    connection.query(statement, function (error, result) {
        // console.log(result)
        callback(null, result);
    });
}

var getAllSchedule = function(callback){
  var current_date = new Date();
  var month;
  if(current_date.getMonth()==11){
    month = 1;
  }else{
    month = current_date.getMonth()+2;
  }
  var year = current_date.getFullYear();
  var statement = "Select iduser,day(worked_day) as data from schedule where month(worked_day)="+month+" and year(worked_day)="+year;
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}

var deleteSchedule = function(callback){
  var current_date = new Date();
  var month;
  if(current_date.getMonth()==11){
    month = 1;
  }else{
    month = current_date.getMonth()+2;
  }
  var year = current_date.getFullYear();
  var statement = "delete from schedule where month(worked_day)="+month+" and year(worked_day)="+year;
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}

var getSchedule = function(iduser,callback){
  var current_date = new Date();
  var month = current_date.getMonth()+1;
  var year = current_date.getFullYear();
  var statement = "Select day(worked_day) as data from schedule where month(worked_day)="+month+" and year(worked_day)="+year+" and iduser= "+iduser;
  connection.query(statement, function (error, result) {
      // console.log(result)
      callback(null, result);
  });
}



module.exports = {
    createSchedule,
    getSchedule,
    getAllSchedule,
    deleteSchedule
};
