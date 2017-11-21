var len=employees.length;
function addEmployee(){

    var new_emp = {
        fullname: $("#fullname_ip").val(),
        gender: $("#gender_ip").val(),
        birthday: $("#birth_ip").val(),
        email: $("#email_ip").val(),
        phone: $("#phone_ip").val(),
        position: $("#position_ip").val(),
        address: $("#address_ip").val()
    };
    // console.log(new_emp.fullname);

    $.ajax({
        url: "../QuanLy/add_emp",
        type: "POST",
        data: JSON.stringify(new_emp),
        contentType: "application/json",
        success: function(){
            // employees.push(new_emp);
            var html=`<div class="employee" id="emp`+len+`">
                        <div class="container emp-content">
                            <div class="col-md-2 img-emp">
                                <img src="images/avatar-1510997165958" alt="">
                            </div>
                            <div class="col-md-10 emp-description">
                                <div class="emp-body">
                                    <div class="title-emp">
                                        <h2>`+new_emp.fullname+`</h2>
                                    </div>
                                    <div class="description container-fluid">
                                        <div class="col-md-6">
                                            <div class="item birthday">
                                                <div class="icon">
                                                <i class="fa fa-birthday-cake" aria-hidden="true"></i>
                                                </div>
                                                <p><input id="birthday`+len+`" name="birthday" class="form-control" readonly type="text" value="`+new_emp.birthday+`"></p>
                                            </div>
                                            <div class="item sex">
                                                <div class="icon">
                                                    <i class="fa fa-mars" aria-hidden="true"></i>
                                                    <i class="fa fa-venus" aria-hidden="true"></i>
                                                </div>
                                                <p><input id="gender`+len+`" class="form-control" name="gender" readonly type="text" value="`+new_emp.gender+`"></p>
                                            </div>
                                            <div class="item position">
                                                <div class="icon">
                                                    <i class="fa fa-user" aria-hidden="true"></i>
                                                </div>
                                                 <p><input class="form-control" name="position" readonly type="text" value="`+new_emp.position+`"></p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="item email">
                                                <div class="icon">
                                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                                </div>
                                                <p><input id="email`+len+`" class="form-control" name="email" readonly type="text" value="`+new_emp.email+`"></p>
                                            </div>
                                            <div class="item phone">
                                                <div class="icon">
                                                    <i class="fa fa-mobile" aria-hidden="true"></i>
                                                </div>
                                                <p><input id=phone`+len+`" class="form-control" readonly type="text" name="phone" value="`+new_emp.phonenumber+`"></p>
                                            </div>
                                            <div class="item address">
                                                <div class="icon">
                                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <p><input id="address`+len+`" class="form-control" name="address" readonly type="text" value="`+new_emp.address+`"></p>
                                             </div>
                                        </div>
                                    </div>

                                    <div class="emp-bottom">
                                        <button type="button" class="btn btn-primary mr-auto edit" id="edit`+len+`" onclick="editForm(`+len+`)">Edit</button>
                                        <button type="button" class="btn btn-primary mr-auto delete"  id=delete`+len+`" onclick="deleteForm(`+len+`)">Delete</button>
                                        <button type="button" class="btn btn-primary mr-auto edit" id="ok`+len+`"  style="display:none;">OK</button>
                                        <button type="button" class="btn btn-primary mr-auto delete" id="cancel`+len+`" style="display:none;"><a style="color:white;">Cancel</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        $("#list_emp").append(html);
        len++;
        }
    });
}


function editForm(i){
    var edit = $("#edit"+i);
    var del = $(`#delete`+i);
    var ok = $(`#ok`+i);
    var cancel = $(`#cancel`+i);
    var phone_n = $("#phone"+i);
    var eml = $("#email"+i);
    var add = $("#address"+i);

    edit.css("display","none");
    del.css("display","none");
    ok.css("display","block");
    cancel.css("display","block");
    phone_n.attr("readonly", false).addClass("form-control");
    phone_n.css("background-color","white");
    eml.attr("readonly", false).addClass("form-control");
    eml.css("background-color","white");
    add.attr("readonly", false).addClass("form-control");
    add.css("background-color","white");

    ok.click(function(){
        update = {
            iduser: employees[i].iduser,
            fullname: employees[i].fullname,
            gender: employees[i].gender,
            birthday: employees[i].birthday,
            email: eml.val(),
            phone: phone_n.val(),
            type: employees[i].type,
            address: add.val()
        };

        $.ajax({
            url: "../QuanLy/edit_emp",
            type: "POST",
            data: JSON.stringify(update),
            contentType: "application/json",
            success: function(){
                phone_n = update.phone;
                eml = update.email;
                add = update.address;
            }
        });

        phone_n.attr("readonly", true)
        phone_n.css("background-color","#eee");
        eml.attr("readonly", true)
        eml.css("background-color","#eee");
        add.attr("readonly", true)
        add.css("background-color","#eee");
        edit.css("display","block");
        del.css("display","block");
        ok.css("display","none");
        cancel.css("display","none"); 
    })
  }

function deleteForm(i){
    $(`#edit`+i).css("display","none");
    $(`#delete`+i).css("display","none");
    $(`#ok`+i).css("display","block");
    $(`#cancel`+i).css("display","block");
    var id = {iduser: employees[i].iduser};
    // console.log(employees[i].iduser);
    $(`#ok`+i).click(function(){
        $.ajax({
            url: "../QuanLy/delete_emp",
            type: "POST",
            data: JSON.stringify(id),
            contentType: "application/json",
            success: function(){
                len--;
                $("#emp"+i).remove();
            }
        });
    })
}

function search(){
    var info=$("#text-searching").val();
    $.ajax({
            url: "../QuanLy/search_emp",
            type: "get",
            data: JSON.stringify({
                info: info
            }),
            contentType: "application/json",
            success: function(){
                
                // len--;
                // $("emp"+i).remove;
            }
    });
}