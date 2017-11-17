
var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thao123",
    database: "test_it4421"
});

var getUSer = function(iduser,param2,callback){
  var getUserByIdCommand="SELECT * FROM user WHERE iduser="+iduser+";";
  console.log(getUserByIdCommand);
  connection.query(getUserByIdCommand,function(error,result){
    if(error){
      throw error;
    }
     console.log(result);
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
    getUSer,
    findUser,
    validPassword,
    generateHash
 };
