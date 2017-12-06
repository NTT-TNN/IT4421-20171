<<<<<<< HEAD
var getEmployeeById = function (id) {
  var fullname, birthday, phonenumber, email, gender, type, address, password;
  var i = 0;
  for (i = 0; i < allUsers.length; i++) {
    if (allUsers[i].iduser == id) {
      // fullname = allUsers[i].fullname;
      // birthday = allUsers[i].birthday;
      // phonenumber = allUsers[i].phonenumber;
      // email = allUsers[i].email;
      // gender = allUsers[i].gender;
      // type = allUsers[i].type;
      // address = allUsers[i].address;
      // password = allUsers[i].password;
      break;
    }
  }
  return allUsers[i];
}
var displayEdit = function (id) {

  let user = getEmployeeById(parseInt(id));
  document.getElementById("position" + user.type).setAttribute("selected", "selected");
  document.getElementById("nameEdit").value = user.fullname;
  document.getElementById("birthdayEdit").value = user.birthday;
  document.getElementById("sexEdit").value = user.gender;
  document.getElementById("typeEdit").value = user.type;
  document.getElementById("emailEdit").value = user.email;
  document.getElementById("phoneNumberEdit").value = user.phonenumber;
  document.getElementById("addressEdit").value = user.address;
  document.getElementById("passwordEdit").value = user.password;
  $("#editUser").unbind().on('click', function () {
    // user = getEmployeeById(id)
    console.log(user.iduser);
    let listType = document.getElementById("positionList");
    user.fullname = document.getElementById("nameEdit").value;
    user.birthday = document.getElementById("birthdayEdit").value;
    user.gender = document.getElementById("sexEdit").value;
    user.type = listType.options[listType.selectedIndex].text;
    user.email = document.getElementById("emailEdit").value;
    user.phonenumber = document.getElementById("phoneNumberEdit").value;
    user.address = document.getElementById("addressEdit").value;
    user.password = document.getElementById("passwordEdit").value
    // user = {
    //   iduser: id,
    //   fullname: nameEdit,
    //   birthday: birthdayEdit,
    //   password: passEdit,
    //   phonenumber: phoneNumberEdit,
    //   email: emailEdit,
    //   gender: sexEdit,
    //   type: typeEdit,
    //   address: addressEdit
    // };
    // for (var i = 0; i < allUsers.length; i++) {
    //   if(allUsers[i].iduser == id){
    //     allUsers[i].fullname = nameEdit;
    //     allUsers[i].birthday = birthdayEdit;
    //     allUsers[i].phonenumber = phoneNumberEdit;
    //     allUsers[i].email = emailEdit;
    //     allUsers[i].gender = sexEdit;
    //     allUsers[i].type = typeEdit;
    //     allUsers[i].address = addressEdit;
    //     allUsers[i].password = passwordEdit;
    //     console.log("edit thanh cong");
    //     break;
    //   }
    // }
    // document.getElementById("name" + id).innerText = user.fullname;
    $(`#user${user.iduser} #name`)[0].innerText = user.fullname;
    // document.getElementById("birthday" + id).innerText = user.birthday;
    $(`#user${user.iduser} #birthday`)[0].innerText = user.birthday;
    // document.getElementById("sex" + id).innerText = user.gender;
    $(`#user${user.iduser} #sex`)[0].innerText = user.gender;
    // document.getElementById("type" + id).innerText = user.type;
    $(`#user${user.iduser} #type`)[0].innerText = user.type;
    // document.getElementById("email" + id).innerText = user.email;
    $(`#user${user.iduser} #email`)[0].innerText = user.email;
    // document.getElementById("phone" + id).innerText = user.phonenumber;
    $(`#user${user.iduser} #phone`)[0].innerText = user.phonenumber;
    // document.getElementById("address" + id).innerText = user.address;
    $(`#user${user.iduser} #address`)[0].innerText = user.address;
=======
var displayEdit = function(id) {
  // var fullname,birthday,phonenumber,email,gender,type,address,password;
  console.log("id: ",id);
  var index;
  for(var i = 0 ; i<allUsers.length;i++){
    if (allUsers[i].iduser == id) {
      index = i;
      break;
    }
  }
    //lay du lieu cua user co userid = id
  fullname = allUsers[index].fullname;
  birthday = allUsers[index].birthday;
  phonenumber = allUsers[index].phonenumber;
  email = allUsers[index].email;
  gender = allUsers[index].gender;
  type = allUsers[index].type;
  address = allUsers[index].address;
  password = allUsers[index].password;

  document.getElementById("position"+type).setAttribute("selected","selected");
  document.getElementById(gender+"Edit").setAttribute("selected","selected");
  document.getElementById("nameEdit").value = fullname;
  $("#birthdayEdit").val(moment(birthday).format("YYYY-MM-DD"));
  document.getElementById("emailEdit").value = email;
  document.getElementById("phoneNumberEdit").value = phonenumber;
  document.getElementById("addressEdit").value = address;
  document.getElementById("passwordEdit").value = password;

  $("#editUser").unbind().on('click',function(){
    listType = document.getElementById("positionList");
    listSex = document.getElementById("sexList");
    nameEdit = document.getElementById("nameEdit").value;
    birthdayEdit = document.getElementById("birthdayEdit").value;
    sexEdit = listSex.options[listSex.selectedIndex].text;
    typeEdit = listType.options[listType.selectedIndex].text;
    emailEdit = document.getElementById("emailEdit").value;
    phoneNumberEdit = document.getElementById("phoneNumberEdit").value;
    addressEdit = document.getElementById("addressEdit").value;
    passwordEdit = document.getElementById("passwordEdit").value;
    user = {
      iduser: id,
      fullname: nameEdit,
      birthday: birthdayEdit,
      password: passwordEdit,
      phonenumber: phoneNumberEdit,
      email: emailEdit,
      gender: sexEdit,
      type: typeEdit,
      address: addressEdit
    };
    console.log("user: "+user.iduser);
      var index;
      for(var i = 0 ; i<allUsers.length;i++){
        if (allUsers[i].iduser == id) {
          index = i;
          break;
        }
      }
>>>>>>> 6a08519f86961cb44e942fd8fcf00b8316789375
    $.ajax({
      url: "/QuanLy/editUser",
      type: "POST",
      data: JSON.stringify(user),
      contentType: 'application/json',
<<<<<<< HEAD
      success: function () {
        // document.getElementById("name" + id).innerText = user.fullname;
        // $(`#user${user.iduser} #name`)[0].innerText = user.fullname;
        // // document.getElementById("birthday" + id).innerText = user.birthday;
        // $(`#user${user.iduser} #birthday`)[0].innerText = user.birthday;
        // // document.getElementById("sex" + id).innerText = user.gender;
        // $(`#user${user.iduser} #sex`)[0].innerText = "user.gender";
        // // document.getElementById("type" + id).innerText = user.type;
        // $(`#user${user.iduser} #type`)[0].innerText = user.type;
        // // document.getElementById("email" + id).innerText = user.email;
        // $(`#user${user.iduser} #email`)[0].innerText = user.email;
        // // document.getElementById("phone" + id).innerText = user.phonenumber;
        // $(`#user${user.iduser} #phone`)[0].innerText = user.phonenumber;
        // // document.getElementById("address" + id).innerText = user.address;
        // $(`#user${user.iduser} #address`)[0].innerText = user.address;
        // // $("#results").append(html);
        console.log("edit thành công")
=======
      success: function(user) {
        allUsers[index].fullname = user[0].fullname;
        allUsers[index].birthday = user[0].birthday1;
        allUsers[index].phonenumber = user[0].phonenumber;
        allUsers[index].email = user[0].email;
        allUsers[index].gender = user[0].gender;
        allUsers[index].type = user[0].type;
        allUsers[index].address = user[0].address;
        allUsers[index].password = user[0].password;
        document.getElementById("name" + id).innerText = user[0].fullname;
        $("#birthday" + id).text(user[0].birthday1);
        document.getElementById("sex" + id).innerText = user[0].gender;
        document.getElementById("type" + id).innerText = user[0].type;
        document.getElementById("email" + id).innerText = user[0].email;
        document.getElementById("phone" + id).innerText = user[0].phonenumber;
        document.getElementById("address" + id).innerText = user[0].address;
        console.log("edit thành công");
>>>>>>> 6a08519f86961cb44e942fd8fcf00b8316789375
      }
    });
  });
}

var deleteUser = function (id) {
  let user = getEmployeeById(id);
  console.log(id);
  $("#deleteConfirm_btn").click(function () {
    $("#user" + id).remove();
    $.ajax({
      url: "/QuanLy/deleteUser",
      type: "POST",
      data: JSON.stringify({
        userid: id
      }),
      contentType: 'application/json',
      success: function () {
        console.log("successful!")
        allUsers.remove(user);
      }
    });
  })
}

var creatNewUser = function (user) {
  html = `<div class="employee" id="user`+ user.iduser + `">
  <div class="container emp-content">
  <div class="col-md-2 img-emp">
  <img src="`+ user.urlavatar + `" alt="">
  </div>
  <div class="col-md-10 emp-description">
  <div class="emp-body">
  <div class="title-emp">
  <h2 id="name">` + user.fullname + `</h2>
  </div>
  <div class="description container-fluid">
  <div class="col-md-6">
  <div class="item birthday">
  <div class="icon">
  <i class="fa fa-birthday-cake" aria-hidden="true"></i>
  </div>
<<<<<<< HEAD
  <p id="birthday">
  `+ user.birthday + `
=======
  <p id="birthday`+user.iduser+`">
  `+user.birthday1+`
>>>>>>> 6a08519f86961cb44e942fd8fcf00b8316789375
  </p>
  </div>
  <div class="item sex">
  <div class="icon">
  <i class="fa fa-mars" aria-hidden="true"></i>
  <i class="fa fa-venus" aria-hidden="true"></i>
  </div>
  <p id="sex">
  `+ user.gender + `
  </p>
  </div>
  <div class="item position">
  <div class="icon">
  <i class="fa fa-user" aria-hidden="true"></i>
  </div>
  <p id="type">
  `+ user.type + `
  </p>
  </div>
  </div>
  <div class="col-md-6">
  <div class="item email">
  <div class="icon">
  <i class="fa fa-envelope" aria-hidden="true"></i>
  </div>
  <p id="email">
  `+ user.email + `
  </p>
  </div>
  <div class="item phone">
  <div class="icon">
  <i class="fa fa-mobile" aria-hidden="true"></i>
  </div>
  <p id="phone">
  `+ user.phonenumber + `
  </p>
  </div>
  <div class="item address">
  <div class="icon">
  <i class="fa fa-map-marker" aria-hidden="true"></i>
  </div>
  <p id="address">
  `+ user.address + `
  </p>
  </div>
  </div>

  </div>
  <div class="emp-bottom">
  <button type="button" data-toggle="modal" data-target="#edit_emp_detail" class="btn btn-primary mr-auto edit" onclick="displayEdit(`+ user.iduser + `)" >Edit</button>
  <button type="button" data-toggle="modal" class="btn btn-primary mr-auto delete" onclick="deleteUser(`+ user.iduser + `)" data-target="#ConfirmFormDelete">Delete</button>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  return html;
}

var resetAddModal = function () {
  $("#nameAdd").val("");
  $("#birthdayAdd").val("");
  $("#male").attr("selected","selected");
  $("#emailAdd").val("");
  $("#phoneAdd").val("");
  $("#addressAdd").val("");
  $("#passwordAdd").val("");
  $("#positionAdd" + position[0].type).attr("selected", "selected");
}

var addEmployee = function () {
  var typeList = document.getElementById("positionListAdd");
  var sexList = document.getElementById("sexAdd");
  var addedEmployee =
<<<<<<< HEAD
    {
      name: $("#nameAdd").val(),
      birthday: $("#birthdayAdd").val(),
      sex: $("#sexAdd").val(),
      email: $("#emailAdd").val(),
      phone: $("#phoneAdd").val(),
      address: $("#addressAdd").val(),
      password: $("#passwordAdd").val(),
      type: typeList.options[typeList.selectedIndex].text
    }
=======
  {
    name: $("#nameAdd").val(),
    birthday: $("#birthdayAdd").val(),
    sex: sexList.options[sexList.selectedIndex].text,
    email: $("#emailAdd").val(),
    phone: $("#phoneAdd").val(),
    address: $("#addressAdd").val(),
    password: $("#passwordAdd").val(),
    type: typeList.options[typeList.selectedIndex].text
  }
>>>>>>> 6a08519f86961cb44e942fd8fcf00b8316789375

  $.ajax({
    url: "/QuanLy/addUser",
    type: "POST",
    data: JSON.stringify(addedEmployee),
    contentType: 'application/json',
    success: function (user) {
      console.log(user);
      console.log(user[0]);
      var newUser = creatNewUser(user[0]);
      $("#list-emp").append(newUser);
      console.log("trc " + allUsers.length);
      allUsers.push(user[0]);
      console.log("sau " + allUsers.length);
      resetAddModal();
    }
  }
<<<<<<< HEAD
  );

}
=======
);
}
>>>>>>> 6a08519f86961cb44e942fd8fcf00b8316789375
