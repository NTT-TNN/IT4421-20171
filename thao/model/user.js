
var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "codai1296",
    database: "it4421"
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

//ham quan ly nhan vien
var getEmployees = function(param1,param2,callback){
  var getEmps="SELECT * FROM user WHERE type != 'manager';";
  // console.log(getEmps);
  connection.query(getEmps,function(error,result){
    if(error){
      throw error;
    }
     // console.log(result);
      callback(null,result);
  });
}

var searchEmployees = function(param1,param2,callback){
  var Emps=`SELECT * FROM user 
            WHERE fullname like '%`+param1+`%'
            OR gender like '%`+param1+`%'
            OR birthday like '%`+param1+`%'
            OR email like '%`+param1+`%'
            OR phone like '%`+param1+`%'
            OR type like '%`+param1+`%'
            OR address like '%`+param1+`%';`;

  // console.log(getEmps);
  connection.query(Emps,function(error,result){
    if(error){
      throw error;
    }
     // console.log(result);
      callback(null,result);
  });
}


function insertEmployee(emp,param2, callback){
    
    var addStatement = `INSERT INTO user (fullname, gender, birthday, phonenumber, email, type, address)
                         VALUES ("`+emp.fullname+`", "`+emp.gender+`","`+emp.birthday+`","`+emp.phone+`","`+emp.email+`", "`+emp.position+`", "`+emp.address+`");`;
    console.log(addStatement);
    connection.query(addStatement, (error, result)=>{ // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql insert error!:");
            callback('add_error');
        }
        else callback('successfull add');
    })

}

function updateEmployee(emp,param2,callback){
    var updateUserCommand="UPDATE user SET fullname = '" + emp.fullname + "', gender = '" + emp.gender + "',birthday = '" + emp.birthday + "', email ='" + emp.email + "',phonenumber = '" + emp.phone + "',type ='" + emp.type + "', address = '" + emp.address + "' WHERE iduser ="+emp.iduser+";";
  
    connection.query( updateUserCommand, (error, result) => { // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql edit error! :");
            callback('error');
        }
        else callback(emp.iduser);

    })   
}

function deleteEmployee(emp,param2, callback) {
    // console.log(id);
    var deleteStatement = `DELETE FROM user
                    WHERE iduser = "`+emp.iduser+`";`;
    connection.query(deleteStatement, (error, result) => { // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql delete error! :");
            callback('error');
        }
        else callback("delete successfull");
    });
}
//end

 module.exports ={
    updateAvatar,
    getUSer,
    findUser,
    updateUser,
    validPassword,
    generateHash,
    getEmployees,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
 };
