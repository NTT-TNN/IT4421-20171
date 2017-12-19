
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "3000",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
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
  console.log(allUsers[index].birthday1);
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
  $("#birthdayEdit").val(moment(new Date(birthday)).format("YYYY-MM-DD"));
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
    if(nameEdit && birthdayEdit && typeEdit && emailEdit && phoneNumberEdit && addressEdit){
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
      $.ajax({
        url: "/QuanLy/editUser",
        type: "POST",
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function(user) {
          allUsers[index].fullname = user[0].fullname;
          allUsers[index].birthday = user[0].birthday;
          allUsers[index].birthday1 = user[0].birthday1;
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
          toastr.success('Sửa thành công','Success!');
        }
      });
      
    }else{
      toastr.error('Thông tin nhân viên chưa đủ hoặc giá chưa đúng','Error!',{timeOut: 2000});
      return;
    }
  });
    
}

var deleteUser = function(id){
  console.log(id);
  $("#deleteConfirm_btn").unbind().click(function(){
    $("#"+id).remove();
    toastr.success('Xóa nhân viên thành công','Success!');
    $.ajax({
      url: "/QuanLy/deleteUser",
      type: "POST",
      data: JSON.stringify({
        userid: id
      }),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
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
  `+user.birthday1+`
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
  $("#male").attr("selected","selected");
  $("#emailAdd").val("");
  $("#phoneAdd").val("");
  $("#addressAdd").val("");
  $("#passwordAdd").val("");
  $("#positionAdd"+position[0].type).attr("selected","selected");
}

var addEmployee =function(){
  var typeList = document.getElementById("positionListAdd");
  var sexList = document.getElementById("sexAdd");
  var name = $("#nameAdd").val();
  var birthday =$("#birthdayAdd").val();
  var email =$("#emailAdd").val();
  var phone = $("#phoneAdd").val()
  var address =$("#addressAdd").val();
  var password =$("#passwordAdd").val();
  var sex = sexList.options[sexList.selectedIndex].text;
  var type = typeList.options[typeList.selectedIndex].text;
  var flag = false;
  for(var i =0 ; i < allUsers.length ; i++){
    if(allUsers[i].email == email){
      flag = true;
      break;
    }
  }


  var addedEmployee =
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

    if(name != "" && birthday != "" && sex != "" && email != "" && phone != "" && address != "" && password != "" && type !=""){
      if(!flag){
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
            toastr.success('Thêm nhân viên thành công','Success!');
            // $("#emp-add").hide();
            // $(".modal-backdrop").remove();
          }
            }
          );
      }else {
          toastr.error('Email đã tồn tại','ERROR!',{timeOut: 2000});
      }
    }else {
      toastr.error('Yêu cầu nhập đủ thông tin','ERROR!',{timeOut: 2000});
    }




}
