
tableNumber = 0;
flagEdit=false;
var table={};
// orders=[];


$('#table_modal').hide().on('hide', function() {
  $('#table_modal').modal('show');
});


function addTable(){
  tableNumber = document.getElementById("table_number").value;
  if(tableNumber != ""){
    if(tableNumber > 0){
      $("#number_table").val(parseInt(tableNumber));
      console.log("ahihi");
      $("#table").hide();
      // console.log(tableNumber);
      table={
        tableID:tableNumber,
        status:0
      }
      var orders =[];
      orders.push(table);
      var jsonOrder = JSON.stringify(orders);
      sessionStorage.setItem( "cart", jsonOrder);
      document.getElementById("table_number").value="";
    }else{
      toastr.error('Số bàn nhập sai','Error!',{timeOut: 2000});
    }
  }

}

if(sessionStorage.length == 0){
  $("#table_modal").modal({show: true});
  $("#table").show();
}else {
  $("#table").hide();

  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse(cartValue);
  $("#number_table").attr("value",cartObj[0].tableID);
  var total = 0;
  var html ="";
  for(var j=1;j<cartObj.length;++j){
    total+=cartObj[j].ProductPrice*cartObj[j].number;
    html+=`<div class="row" id="doUong`+j+`">
    <div class="col-md-1 center-margin">
    1
    </div>
    <div class="col-md-4 center-margin">` + cartObj[j].ProductName +
    `</div>
    <input class="col-md-2 center-margin ordernumber" readonly style="border: none;"value='`+cartObj[j].number+`'>
    <div class="col-md-2 center-margin">` + cartObj[j].ProductPrice+
    `$</div>
    <div class="col-md-2 center-margin ">
    <img src="../images/icon/error.png" alt="" onclick="removeDoUong('`+j+`')" class="destroydouong">
    </div>
    <div class="col-md-1 center-margin">

    </div>
    </div>`;
  }
  html+=`<div class="row">
  <div class="col-md-1 center-margin"></div>
  <div class="col-md-4 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin">
  <h6 id="total">`+total+ `$</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>`;
  document.getElementById("order_products").innerHTML = html;
  html="";
}

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

html="";
var socket = io("https://ccbd6e7f.ngrok.io");
socket.on('connect', function() {
  console.log('hello');
  socket.emit('name', {name: 'order'});
})

function addDoUong(i){
  if(sessionStorage.length != 0){
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    if(cartObj[0].tableID != null){
      if(document.getElementById(products[i].ProductID).value != ""){
        if(flagEdit==false){
          if(document.getElementById(products[i].ProductID).value > 0){
            var ProductID= products[i].ProductID;
            var ProductName= products[i].ProductName;
            var ProductPrice=products[i].Price;
            var number= parseInt(document.getElementById(ProductID).value);
            // var number=1;
            product={
              ProductID: ProductID,
              number:number,
              ProductName:ProductName,
              ProductPrice:ProductPrice
            }
            var flag=true;
            for(var j=1;j<cartObj.length;++j){
              if(cartObj[j].ProductID==ProductID){
                cartObj[j].number+=number;
                sessionStorage.setItem("cart",JSON.stringify(cartObj));
                flag=false;
              }
            }
            if(flag==true){
              cartObj.push(product);
              sessionStorage.setItem("cart",JSON.stringify(cartObj));
            }
            html="";
            total=0;
            for(var j=1;j<cartObj.length;++j){
              total+=cartObj[j].ProductPrice*cartObj[j].number;
              html+=`<div class="row" id="doUong`+j+`">
              <div class="col-md-5 center-margin">` + cartObj[j].ProductName +
              `</div>
              <input class="col-md-2 center-margin ordernumber" readonly style="border: none;"value='`+cartObj[j].number+`'>
              <div class="col-md-2 center-margin">` + cartObj[j].ProductPrice+
              `$</div>
              <div class="col-md-2 center-margin">
              <img src="../images/icon/error.png" alt="" onclick="removeDoUong('`+j+`')" class = "destroydouong">
              </div>
              <div class="col-md-1 center-margin">
              </div>
              </div>`;
            }
            html+=`<div class="row">
            <div class="col-md-1 center-margin"></div>
            <div class="col-md-4 center-margin"></div>
            <div class="col-md-2 center-margin"></div>
            <div class="col-md-2 center-margin"></div>
            <div class="col-md-2 center-margin">
            <h6 id="total">`+total+ `$</h6>
            </div>
            <div class="col-md-1 center-margin">
            <br>
            </div>
            </div>`;
            document.getElementById("order_products").innerHTML = html;
            html="";
            return true;
          }else{
            toastr.error('Số lượng nhập sai','Error!',{timeOut: 2000});
          }

        }else{
          toastr.error('Chưa sửa xong đơn hàng','Error!',{timeOut: 2000});
        }
      }else {
        toastr.error('Chưa có số lượng','Error!',{timeOut: 2000});
      }
    }else{
      toastr.error('Chưa điền số bàn','Error!',{timeOut: 2000});
    }

  }else{
    toastr.error('Chưa điền số bàn','Error!',{timeOut: 2000});
  }


};

function guiDonHang(){
  if(sessionStorage.length != 0){
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    if(cartObj[0].tableID != null){
      $("#table").show();
      if(cartObj.length>1){ // Don hang ko rong
        // luu vao csdl
        var data = cartObj;
        // console.log("order gui di "+JSON.stringify(orders));
        socket.emit("order",data);
        // console.log(orders);
        sessionStorage.removeItem("cart");
        // orders.push(table);
        toastr.success('Gửi đơn hàng thành công','Success!');
        document.getElementById("order_products").innerHTML = html;
        $("#number_table").val("");
        if(flagEdit == true){
          flagEdit = false;
          $("#editBTN").show();
          $("#OKedit").hide();
          $(".destroydouong").show();
          // var x = $(".ordernumber");
          $("#number_table").attr("readonly", true).removeClass("form-control");
          $("#number_table").css("background","#2196f3");
        }
      }else { // Don hang rong
        toastr.error('Đơn hàng rỗng','Error!',{timeOut: 2000});
      }
    }else{
      toastr.error('Chưa điền số bàn','Error!',{timeOut: 2000});
    }
  }else{
    toastr.error('Đơn hàng rỗng','Error!',{timeOut: 2000});

  }
}

function editOrder(){
  if(($("#number_table").val() != "") || ($("#number_table").val() == "" && sessionStorage.length != 0) ){
    flagEdit=true;
    var y = $(".ordernumber");
    y.attr({readonly: false,type :"number",min:1}).addClass("form-control");
    $("#number_table").attr({readonly: false,type :"number",min:1}).addClass("form-control");
    $("#number_table").css("background","white");

    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    $(".destroydouong").hide();
    $("#editBTN").hide();
    $("#OKedit").show();

    $("#OKedit").click(function(){
      var flagNumber = 0;
      y.each(function(i){
        if(this.value <= 0){
          flagNumber++;
        };
      });
      console.log(flagNumber);
      if($("#number_table").val() > 0 && flagNumber==0){
        flagEdit = false;
        $(".destroydouong").show();
        // var x = $(".ordernumber");

        $("#number_table").attr("readonly", true).removeClass("form-control");
        $("#number_table").css("background","#2196f3");
        y.attr("readonly", true).removeClass("form-control");

        cartObj[0].tableID = parseInt($("#number_table").val());
        y.each(function(i){
          cartObj[i+1].number=this.value;
        })
        sessionStorage.setItem("cart",JSON.stringify(cartObj));
        $("#editBTN").show();
        $("#OKedit").hide();
        var total1=0;
        for(var j=1;j<cartObj.length;++j){
          total1+=cartObj[j].ProductPrice*cartObj[j].number;
        }
        $("#total").text(total1+"$");
        total = total1;
      }else{
        toastr.error('Chỉnh sửa không hợp lệ','Error!',{timeOut: 1000});
      }

    });
  }
}

function removeDoUong(i){
  var cartValue = sessionStorage.getItem( "cart" );
  var cartObj = JSON.parse(cartValue);
  total -= cartObj[i].number*cartObj[i].ProductPrice;
  var htmlTotal=total+"$"
  $("#total").html(htmlTotal);
  cartObj.splice(i, 1);
  sessionStorage.setItem("cart",JSON.stringify(cartObj));
  var doUongId="doUong"+i;
  $("#doUong"+i).remove();
  html="";
  total=0;
  for(var j=1;j<cartObj.length;++j){
    total+=cartObj[j].ProductPrice*cartObj[j].number;
    html+=`<div class="row" id="doUong`+j+`">
    <div class="col-md-1 center-margin">
    1
    </div>
    <div class="col-md-4 center-margin">` + cartObj[j].ProductName +
    `</div>
    <input class="col-md-2 center-margin ordernumber" readonly style="border: none;"value='`+cartObj[j].number+`'>
    <div class="col-md-2 center-margin">` + cartObj[j].ProductPrice+
    `$</div>
    <div class="col-md-2 center-margin ">
    <img src="../images/icon/error.png" alt="" onclick="removeDoUong('`+j+`')" class ="destroydouong" >
    </div>
    <div class="col-md-1 center-margin">

    </div>
    </div>`;
  }
  html+=`<div class="row">
  <div class="col-md-1 center-margin"></div>
  <div class="col-md-4 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin">
  <h6 id="total">`+total+ `$</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>`;
  document.getElementById("order_products").innerHTML = html;
  html="";
  console.log(total);
}
