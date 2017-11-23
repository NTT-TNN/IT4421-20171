var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "akonakon",
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

  var updateUserCommand = "UPDATE user SET fullname = '" + param1.name + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phone + "',type ='" + param1.position + "', address = '" + param1.diachi + "' WHERE iduser =" + param1.iduser + ";";
  connection.query(updateUserCommand, function(error, result) {
    callback(null, result);
  });
}

var insertUser = function(user,callback) {
  var statement = "INSERT into user(fullname,birthday,password,phonenumber,email,gender,urlavatar,type,address) values('"+user.name+"', '"+user.birthday+"','"+user.password+"','"+user.phone+"','"+user.email+"','"+user.sex+"','images/avatar-1510997165958','"+user.type+"','"+user.address+"');";
  connection.query(statement, function(error,result){
    if (error) {
      throw error;
    }else {
        callback(null, result);
    }
  })
}

var editUser = function(param1,callback){
    var updateUser = "UPDATE user SET fullname = '" + param1.fullname + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phonenumber + "',type ='" + param1.type + "', address = '" + param1.address + "',password ='"+param1.password+"' WHERE iduser =" + param1.iduser + ";";
    connection.query(updateUser, function(error, result){
      if (error) {
        throw error;
      }else {
          callback(null, result);
      }
    })
};

var getAllUSers = function(param1, param2, callback) {
  var getall = "SELECT * FROM user ;";
  connection.query(getall, function(error, result) {
    if (error) {
      throw error;
    }
    // console.log(" ket qua truy van allUsers" + result);
    callback(null, result);
  });
};

var deleteUser = function(id, callback){
  var deleteStatement = "DELETE FROM user WHERE iduser = "+id+";";
  connection.query(deleteStatement, function(error,result){
    callback(error,result);
  });
}

var getUSer = function(iduser, param2, callback) {
  var getUserByIdCommand = "SELECT * FROM user WHERE iduser=" + iduser + ";";
  // console.log(getUserByIdCommand);
  connection.query(getUserByIdCommand, function(error, result) {
    if (error) {
      throw error;
    }
    callback(null, result);
  });
};

var getPosition = function(param1, param2,callback){
  var statement = "SELECT distinct type from user;";
  connection.query(statement,function(error,result){
    // console.log("ket qua truy van "+result);
    callback(error,result);
  })

};

var findUser = function(param1, param2, callback) {
  var findUserCommand = "SELECT * FROM user where email='" + param1 + "' and password='" + param2 + "';";
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


module.exports = {
  insertUser,
  getPosition,
  deleteUser,
  editUser,
  updateAvatar,
  getUSer,
  getAllUSers,
  findUser,
  updateUser,
  validPassword,
  generateHash
};
