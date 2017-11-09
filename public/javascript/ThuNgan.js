orders_list = "";
order_modal = "";
unpaid_bills = "";
all_bills = "";
height = 100, total = 0;
orders = [];
var socket = io('http://localhost:8000');
socket.on('connect', function() {
  socket.emit('name', {
    name: 'banhang'
  });
})

socket.on("order", function(order) {
  // console.log('data: ', order);
  orders.push(order);
  reload("chuaxacnhan", orders, "order_list_waitting", order_modal,"Xác nhận");
  display_all();

});

// ham nay su dung de xoa toan bo html da su dung truoc do

var removeAllChiled = function(id) {
  var myNode = document.getElementById(id);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

var changeStt = function(x) {
  if(orders[x][0].status == 0){
    orders[x][0].status = 1;
    reload("chuaxacnhan", orders, "order_list_waitting", order_modal,"Xác nhận");

    var $bill, $bills;
    $bills = $(".bills");
    $bill = `<div class="note">
    <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Order_detail` +
    (x+1) + `"><span style="font-size:50px;">` + orders[x][0].tableID + `</span>
    </div>
    </div>`;
    $bills.append($bill);

    unpaid_bills += `<div class="modal fade" id="Order_detail` + (x+1) + `" role="dialog">
    <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
    <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
    <h4 class="modal-title">Order details</h4>
    </div>
    <div class="modal-body">
    <div class="container-fluid" style="text-align: center;">
    <div class="row">
    <div class="col-md-1 center-margin">
    <h6>TABLE</h6>
    </div>
    <div class="col-md-4 center-margin">
    PRODUCT
    </div>
    <div class="col-md-2 center-margin">
    <h6>NUMBER</h6>
    </div>
    <div class="col-md-2 center-margin">
    <h6>PRICE</h6>
    </div>
    <div class="col-md-2 center-margin">
    <h6>TOTAL</h6>
    </div>
    <div class="col-md-1 center-margin">
    <br>
    </div>
    </div>
    <div id="order_products` + orders[x].length + `">`;
    for (var j = 1; j < orders[x].length; j++) {
      total = 0;
      total += orders[x][j].ProductPrice * orders[x][j].number;
      unpaid_bills += `<div class="row">
      <div class="col-md-1 center-margin">
      1
      </div>
      <div class="col-md-4 center-margin">` + orders[x][j].ProductName +
      `</div>
      <div class="col-md-2 center-margin">` + orders[x][j].number +
      `</div>
      <div class="col-md-2 center-margin">` + orders[x][j].ProductPrice +
      `.000</div>
      <div class="col-md-2 center-margin">
      <h6></h6>
      </div>
      <div class="col-md-1 center-margin">
      <br>
      </div>
      </div>`;
    }
    unpaid_bills += `</div>
    </div>
    <div class="row">
    <div class="col-md-1 center-margin"></div>
    <div class="col-md-4 center-margin"></div>
    <div class="col-md-2 center-margin"></div>
    <div class="col-md-2 center-margin"></div>
    <div class="col-md-2 center-margin">
    <h6>` + total + `.000</h6>
    </div>
    <div class="col-md-1 center-margin">
    <br>
    </div>
    </div>
    </div>
    <div class="modal-footer">
    <div class="container-fluid text-center">
    <button onclick = "thanhToan('`+ x +`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Thanh toán </button>
    </div>
    </div>
    </div>
    </div>
    </div>`;
    document.getElementById("unpaid_bills").innerHTML = unpaid_bills;
  }else if(orders[x][0].status == 1){
    orders[x][0].status = 2;
    reload("chuathanhtoan",orders,"unpaid_bills",unpaid_bills, "Thanh Toán");
  }
}

function thanhToan(i){
  var data=orders[i];
  console.log(data);
  $.ajax({
  type: 'POST',
  data: JSON.stringify(data),
  contentType: 'application/json',
  url: 'http://127.0.0.1:8000/ThuNgan/thanhToan',
  success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
    }
  });
}

var reload = function(id_list,list,id_modal,modal,button){
  var status;
  if(id_list == "chuaxacnhan"){
    status = 0;
  }else{
    status = 1;
  }
  modal = "";
  removeAllChiled(id_list);
  id_list = "#"+id_list;
  var length=0 ;

  for (var i = 0; i < list.length; i++) {
    length++;
    if (list[i][0].status == status) {
      var $element, $arr;
      $arr = $(id_list);
      $element = `<div class="note">
      <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Order_detail` +
      length + `"><span style="font-size:50px;">` + list[i][0].tableID + `</span>
      </div>
      </div>`;
      $arr.append($element);

      modal += `<div class="modal fade" id="Order_detail` + length + `" role="dialog">
      <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
      <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
      <h4 class="modal-title">Order details</h4>
      </div>
      <div class="modal-body">
      <div class="container-fluid" style="text-align: center;">
      <div class="row">
      <div class="col-md-1 center-margin">
      <h6>TABLE</h6>
      </div>
      <div class="col-md-4 center-margin">
      PRODUCT
      </div>
      <div class="col-md-2 center-margin">
      <h6>NUMBER</h6>
      </div>
      <div class="col-md-2 center-margin">
      <h6>PRICE</h6>
      </div>
      <div class="col-md-2 center-margin">
      <h6>TOTAL</h6>
      </div>
      <div class="col-md-1 center-margin">
      <br>
      </div>
      </div>
      <div id="order_products` + length + `">`;
      for (var j = 1; j < list[i].length; j++) {
        total = 0;
        total += list[i][j].ProductPrice * list[i][j].number;
        modal += `<div class="row">
        <div class="col-md-1 center-margin">
        1
        </div>
        <div class="col-md-4 center-margin">` + list[i][j].ProductName +
        `</div>
        <div class="col-md-2 center-margin">` + list[i][j].number +
        `</div>
        <div class="col-md-2 center-margin">` + list[i][j].ProductPrice +
        `.000</div>
        <div class="col-md-2 center-margin">
        <h6></h6>
        </div>
        <div class="col-md-1 center-margin">
        <br>
        </div>
        </div>`;
      }
      modal += `</div>
      </div>
      <div class="row">
      <div class="col-md-1 center-margin"></div>
      <div class="col-md-4 center-margin"></div>
      <div class="col-md-2 center-margin"></div>
      <div class="col-md-2 center-margin"></div>
      <div class="col-md-2 center-margin">
      <h6>` + total + `.000</h6>
      </div>
      <div class="col-md-1 center-margin">
      <br>
      </div>
      </div>
      </div>
      <div class="modal-footer">
      <div class="container-fluid text-center">
      <button onclick = "changeStt('`+i+`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto">`+button+` </button>
      </div>
      </div>
      </div>
      </div>
      </div>`;

      document.getElementById(id_modal).innerHTML = modal;
    }
  }
}

var display_all = function(){
  $all = $(".all_bills");
  $element = `<div class="note">
  <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Bill_detail` +
  orders.length + `"><span style="font-size:50px;">` + orders[orders.length-1][0].tableID + `</span>
  </div>
  </div>`;
  $all.append($element);
  all_bills +=`<div class="modal fade" id="Bill_detail` + orders.length + `" role="dialog">
  <div class="modal-dialog">

  <!-- Modal content-->
  <div class="modal-content">
  <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
  <h4 class="modal-title">Order details</h4>
  </div>
  <div class="modal-body">
  <div class="container-fluid" style="text-align: center;">
  <div class="row">
  <div class="col-md-1 center-margin">
  <h6>TABLE</h6>
  </div>
  <div class="col-md-4 center-margin">
  PRODUCT
  </div>
  <div class="col-md-2 center-margin">
  <h6>NUMBER</h6>
  </div>
  <div class="col-md-2 center-margin">
  <h6>PRICE</h6>
  </div>
  <div class="col-md-2 center-margin">
  <h6>TOTAL</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>
  <div id="order_products` + orders.length + `">`;
  for (var j = 1; j < orders[orders.length-1].length; j++) {
    total = 0;
    total += orders[orders.length-1][j].ProductPrice * orders[orders.length-1][j].number;
    all_bills += `<div class="row">
    <div class="col-md-1 center-margin">
    1
    </div>
    <div class="col-md-4 center-margin">` + orders[orders.length-1][j].ProductName +
    `</div>
    <div class="col-md-2 center-margin">` + orders[orders.length-1][j].number +
    `</div>
    <div class="col-md-2 center-margin">` + orders[orders.length-1][j].ProductPrice +
    `.000</div>
    <div class="col-md-2 center-margin">
    <h6></h6>
    </div>
    <div class="col-md-1 center-margin">
    <br>
    </div>
    </div>`;
  }
  all_bills += `</div>
  </div>
  <div class="row">
  <div class="col-md-1 center-margin"></div>
  <div class="col-md-4 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin">
  <h6>` + total + `.000</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`;

  document.getElementById("all_bills_modal").innerHTML = all_bills;
}
