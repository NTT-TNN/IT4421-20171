
var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akonakon",
    database: "test_it4421"
});

var updateAvatar = function (param1,param2,callback) {
  updateAvatarCommand="UPDATE user SET urlavatar = '"+escape(param1)+"' WHERE iduser="+param2+";";
  console.log(updateAvatarCommand);
  connection.query(updateAvatarCommand,function(error,result){
      callback(null,result);
  });
}

var updateUser = function (param1,param2,callback) {
  // console.log(param1);
  var updateUserCommand="UPDATE user SET fullname = '" + param1.name + "', gender = '" + param1.gender + "',birthday = '" + param1.birthday + "', email ='" + param1.email + "',phonenumber = '" + param1.phone + "',type ='" + param1.position + "', address = '" + param1.diachi + "' WHERE iduser ="+param1.iduser+";";
  // console.log(updateUserCommand);
  connection.query(updateUserCommand,function(error,result){
      callback(null,result);
  });
}

var getUSer = function(iduser,param2,callback){
  var getUserByIdCommand="SELECT * FROM user WHERE iduser="+iduser+";";
  // console.log(getUserByIdCommand);
  connection.query(getUserByIdCommand,function(error,result){
    if(error){
      throw error;
    }
     // console.log(result);
      callback(null,result);
  });
}

var findUser=function(param1,param2,callback){
  var findUserCommand="SELECT * FROM user where email='"+param1+"' and password='"+param2+"';";
    connection.query(findUserCommand,function(error,result){
        callback(error,result);
    });
}

function generateHash(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

function validPassword(password){
  return bcrypt.compareSync(password,this.local.password);
}


 module.exports ={
    updateAvatar,
    getUSer,
    findUser,
    updateUser,
    validPassword,
    generateHash
 };
