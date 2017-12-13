var mysql = require('mysql');
var moment = require('moment');
var md5 = require('md5');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "thao123@",
=======
  password: "akonakon",
>>>>>>> master
  database: "test_it4421"
});

var updateAvatar = function(param1, param2, callback) {
  updateAvatarCommand = "UPDATE user SET urlavatar = '" + escape(param1) + "' WHERE iduser=" + param2 + ";";
  console.log(updateAvatarCommand);
  connection.query(updateAvatarCommand, function(error, result) {
    callback(null, result);
  });
}

var updateUser = function(param1, param2, callback) {
  // console.log(moment(param1.birthday).format("YYYY-MM-DD"));
  var updateUserCommand = "UPDATE user SET fullname = '" + param1.name + "', email ='" + param1.email + "',phonenumber = '" + param1.phone + "', address = '" + param1.diachi + "' WHERE iduser =" + param1.iduser + ";";
  console.log(updateUserCommand);
  connection.query(updateUserCommand, function(error, result) {
    callback(null, result);
  });
}

var insertUser = function(user,callback) {
  var startdate = moment(new Date()).format("YYYY-MM-DD");
  console.log(md5(user.password));
  var statement = "INSERT into user(fullname,birthday,password,phonenumber,email,gender,urlavatar,`type`,address,startdate,isActive) values('"+user.name+"', '"+user.birthday+"','"+md5(user.password)+"','"+user.phone+"','"+user.email+"','"+user.sex+"','images/avatar-1510997165958','"+user.type+"','"+user.address+"','"+startdate+"',1);";
  console.log(statement);
  connection.query(statement, function(error,result){
    if (error) {
      throw error;
    }else {
        callback(null, result);
    }
  })
}

var editUser = function(param1,callback){
    var find = " select * from user where iduser ="+ param1.iduser +";";
    connection.query(find, function(error , rs ){
      if(rs[0].password == param1.password){
        var updateUser = "UPDATE user SET fullname = '" + param1.fullname + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phonenumber + "',`type` ='" + param1.type + "', address = '" + param1.address + "' WHERE iduser =" + param1.iduser + ";";
        console.log(updateUser);
        connection.query(updateUser, function(error, result){
          if (error) {
            throw error;
          }else {
              callback(null, result);
          }
        })
      }else{
        var updateUser = "UPDATE user SET fullname = '" + param1.fullname + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phonenumber + "',`type` ='" + param1.type + "', address = '" + param1.address + "',password ='"+md5(param1.password)+"' WHERE iduser =" + param1.iduser + ";";
        console.log(updateUser);
        connection.query(updateUser, function(error, result){
          if (error) {
            throw error;
          }else {
              callback(null, result);
          }
        })
      }
    });
};

var getAllUsers = function(param1, param2, callback) {
  var getall = "SELECT * , DATE_FORMAT(birthday,'%d/%m/%Y') as birthday1 FROM user where isActive = 1 and `type` <> 'manager';";
  connection.query(getall, function(error, result) {
    if (error) {
      throw error;
    }
    callback(null, result);
  });
};

var deleteUser = function(id, callback){
  var enddate = moment(new Date()).format("YYYY-MM-DD");
  var deleteStatement = "UPDATE user SET isActive = 0 , enddate = '"+enddate+"' WHERE iduser = "+id+";";
  connection.query(deleteStatement, function(error,result){
    callback(error,result);
  });
};

var getUser = function(iduser, param2, callback) {
  var getUserByIdCommand = "SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthday1 FROM user WHERE iduser=" + iduser + ";";
  console.log(getUserByIdCommand);
  connection.query(getUserByIdCommand, function(error, result) {
    console.log("result: ", result[0].iduser);
    if (error) {
      throw error;
    }
    callback(null, result);
  });
};

var getPosition = function(param1, param2,callback){
  var statement = "SELECT distinct `type` from user;";
  connection.query(statement,function(error,result){
    // console.log("ket qua truy van "+result);
    callback(error,result);
  })
};

var findUser = function(param1, param2, callback) {
// console.log(md5(param2));
  var findUserCommand = "SELECT * FROM user where isActive = 1 and email='" + param1 + "' and password='" +md5(param2) + "';";
  connection.query(findUserCommand, function(error, result) {
    callback(error, result);
  });
};

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var searchUser = function(data , callback){
  var statement = "SELECT *,DATE_FORMAT(birthday,'%d/%m/%Y') as birthday1 FROM user where `type` <> 'manager' and isActive = 1 and (fullname like '%"+data+"%' or `type` like '%"+data+"%' );"
  console.log(statement);
  connection.query(statement, function(error, result){
    if (error) {
      throw error;
    }
    callback(null, result);
  })
}
var complete = function(data,callback){
  var stt ="SELECT fullname from user where isActive = 1 and fullname like '%"+data+"%'";
  console.log(stt);
  connection.query(stt, function(err, rows) {
    if (err) {
      throw error;
    }
      callback(null,rows);
	});
}
var complete1 = function(data,callback){
  statement = "SELECT `type` from user where isActive = 1 and `type` like '%"+data+"%' and `type` <> 'manager'";
  console.log(statement);
  connection.query(statement , function(err, rows) {
    if (err) {
      throw error;
    }
      callback(null,rows);
	});
}

module.exports = {
  insertUser,
  complete1,
  complete,
  searchUser,
  getPosition,
  deleteUser,
  editUser,
  updateAvatar,
  getUser,
  getAllUsers,
  findUser,
  updateUser,
  validPassword,
  generateHash
};
