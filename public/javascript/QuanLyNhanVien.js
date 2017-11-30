var displayEdit = function(id) {
  // var fullname,birthday,phonenumber,email,gender,type,address,password;
  var index;
  for(i =0 ; i<allUsers.length;i++){
    if (allUsers[i].iduser == id) {
      index = i;
      break;
    }
  }
  fullname = allUsers[index].fullname;
  birthday = allUsers[index].birthday;
  phonenumber = allUsers[index].phonenumber;
  email = allUsers[index].email;
  gender = allUsers[index].gender;
  type = allUsers[index].type;
  address = allUsers[index].address;
  password = allUsers[index].password;
  document.getElementById("position"+type).setAttribute("selected","selected");
  document.getElementById("nameEdit").value = fullname;
  $("#birthdayEdit").val(moment(birthday).format("YYYY-MM-DD"));
  document.getElementById("sexEdit").value = gender;
  document.getElementById("typeEdit").value = type;
  document.getElementById("emailEdit").value = email;
  document.getElementById("phoneNumberEdit").value = phonenumber;
  document.getElementById("addressEdit").value = address;
  document.getElementById("passwordEdit").value = password;
  $("#editUser").click(function() {
    listType = document.getElementById("positionList");
    nameEdit = document.getElementById("nameEdit").value;
    birthdayEdit = document.getElementById("birthdayEdit").value;
    sexEdit = document.getElementById("sexEdit").value;
    typeEdit = listType.options[listType.selectedIndex].text;
    emailEdit = document.getElementById("emailEdit").value;
    phoneNumberEdit = document.getElementById("phoneNumberEdit").value;
    addressEdit = document.getElementById("addressEdit").value;
    passEdit = document.getElementById("passwordEdit").value;
    console.log(moment(birthdayEdit).format("YYYY-MM-DD"));
    user = {
      iduser: id,
      fullname: nameEdit,
      birthday: birthdayEdit,
      password: passEdit,
      phonenumber: phoneNumberEdit,
      email: emailEdit,
      gender: sexEdit,
      type: typeEdit,
      address: addressEdit
    };
        allUsers[index].fullname = nameEdit;
        allUsers[index].birthday = birthdayEdit;
        allUsers[index].phonenumber = phoneNumberEdit;
        allUsers[index].email = emailEdit;
        allUsers[index].gender = sexEdit;
        allUsers[index].type = typeEdit;
        allUsers[index].address = addressEdit;
        allUsers[index].password = passwordEdit;
    document.getElementById("name" + id).innerText = nameEdit;
    $("#birthday" + id).text(moment(birthdayEdit).format("YYYY-MM-DD"));
    document.getElementById("sex" + id).innerText = sexEdit;
    document.getElementById("type" + id).innerText = typeEdit;
    document.getElementById("email" + id).innerText = emailEdit;
    document.getElementById("phone" + id).innerText = phoneNumberEdit;
    document.getElementById("address" + id).innerText = addressEdit;
    $.ajax({
      url: "/QuanLy/editUser",
      type: "POST",
      data: JSON.stringify(user),
      contentType: 'application/json',
      success: function() {
        console.log("edit thành công")
      }
    });
  })
}

var deleteUser = function(id){
  console.log(id);
  $("#deleteConfirm_btn").click(function(){
    $("#"+id).remove();
    $.ajax({
      url: "/QuanLy/deleteUser",
      type: "POST",
      data: JSON.stringify({
        userid: id
      }),
      contentType: 'application/json',
      success: function() {
        console.log("successful!")
      }
    });
  })
}

var creatNewUser = function(user) {
  html = `<div class="employee" id="`+user.iduser+`">
  <div class="container emp-content">
  <div class="col-md-2 img-emp">
  <img src="`+user.urlavatar+`" alt="">
  </div>
  <div class="col-md-10 emp-description">
  <div class="emp-body">
  <div class="title-emp">
  <h2 id="name`+user.iduser+`">`+user.fullname+`</h2>
  </div>
  <div class="description container-fluid">
  <div class="col-md-6">
  <div class="item birthday">
  <div class="icon">
  <i class="fa fa-birthday-cake" aria-hidden="true"></i>
  </div>
  <p id="birthday`+user.iduser+`">
  `+new Date(user.birthday).toDateString()+`
  </p>
  </div>
  <div class="item sex">
  <div class="icon">
  <i class="fa fa-mars" aria-hidden="true"></i>
  <i class="fa fa-venus" aria-hidden="true"></i>
  </div>
  <p id="sex`+user.iduser+`">
  `+user.gender +`
  </p>
  </div>
  <div class="item position">
  <div class="icon">
  <i class="fa fa-user" aria-hidden="true"></i>
  </div>
  <p id="type`+user.iduser+`">
  `+user.type+`
  </p>
  </div>
  </div>
  <div class="col-md-6">
  <div class="item email">
  <div class="icon">
  <i class="fa fa-envelope" aria-hidden="true"></i>
  </div>
  <p id="email`+user.userid+`">
  `+user.email+`
  </p>
  </div>
  <div class="item phone">
  <div class="icon">
  <i class="fa fa-mobile" aria-hidden="true"></i>
  </div>
  <p id="phone`+user.iduser+`">
  `+user.phonenumber+`
  </p>
  </div>
  <div class="item address">
  <div class="icon">
  <i class="fa fa-map-marker" aria-hidden="true"></i>
  </div>
  <p id="address`+user.iduser+`">
  `+user.address+`
  </p>
  </div>
  </div>

  </div>

  <div class="emp-bottom">
  <button type="button" data-toggle="modal" data-target="#edit_emp_detail" class="btn btn-primary mr-auto edit" onclick="displayEdit(`+user.iduser+`)">Edit</button>
  <button type="button" data-toggle="modal" class="btn btn-primary mr-auto delete" onclick="deleteUser(`+user.iduser+`)" data-target="#ConfirmFormDelete">Delete</button>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  return html;
}

var resetAddModal =function(){
  $("#nameAdd").val("");
  $("#birthdayAdd").val("");
  $("#sexAdd").val("");
  $("#emailAdd").val("");
  $("#phoneAdd").val("");
  $("#addressAdd").val("");
  $("#passwordAdd").val("");
  $("#positionAdd"+position[0].type).attr("selected","selected");
}

var addEmployee =function(){
  var typeList = document.getElementById("positionListAdd");
  var addedEmployee =
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

  $.ajax({
    url: "/QuanLy/addUser",
    type : "POST",
    data: JSON.stringify(addedEmployee),
    contentType: 'application/json',
    success: function (user) {
      var newUser = creatNewUser(user[0]);
      $("#list-emp").append(newUser);
      console.log("trc " + allUsers.length);
      allUsers.push(user[0]);
      console.log("sau " + allUsers.length);
      resetAddModal();
    }
  }
);

}
