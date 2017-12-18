orders_list = "";
order_modal = "";
unpaid_bills = "";
all_bills = "";
height = 100;
orders = [];

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

var socket = io('http://localhost:8000');
socket.on('connect', function() {
  socket.emit('name', {
    name: 'banhang'
  });
});

socket.on("order", function(new_order) {
  $(".modal-backdrop").remove();
  console.log("data: ", new_order);

  //hien thi don hang moi
  var $order, $orders;
  $orders = $(".orders");
  $order = `<div class="note col-md-4" id="note`+new_order[0].order_id+`">
  <div class="note-inner"  data-toggle="modal" data-target="#New_order_detail` + new_order[0].order_id + `"><span style="font-size:50px;">Table: ` + new_order[1][0].TableID + `<br><h4>ID: `+new_order[0].order_id+`</h4></span>
  </div>
  </div>`;
  $orders.append($order);

  var modal = "";
  modal += `<div class="modal fade" id="New_order_detail` + new_order[0].order_id + `" role="dialog">
  <div class="modal-dialog">

  <!-- Modal content-->
  <div class="modal-content">
  <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
  <h4 class="modal-title">TABLE: `+new_order[1][0].TableID+`</h4>
  </div>
  <div class="modal-body">
  <div class="container-fluid" style="text-align: center;">
  <div class="row">
  <div class="col-md-5 center-margin">
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
  <div id="order_products` + new_order[0].order_id + `">`;

  for (var j = 0; j < new_order[2].length; j++) {
    modal += `<div class="row">
    <div class="col-md-5 center-margin">` + new_order[2][j].ProductName +
    `</div>
    <div class="col-md-2 center-margin">` + new_order[2][j].Quantity +
    `</div>
    <div class="col-md-2 center-margin">` + new_order[2][j].Price +
    `$</div>
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
  <h6>` + new_order[1][0].Total + `$</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>
  </div>
  <div class="modal-footer">
  <div class="container-fluid text-center">
  <button onclick = "changeStatus('`+new_order[0].order_id+`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto">Xác nhận</button>
  </div>
  </div>
  </div>
  </div>
  </div>`;

  $("#order_list_waitting").append(modal);

  //hien thi o muc All
  var $all, $bill;
  $all = $(".all_bills");
  $bill = `<div class="note col-md-4" >
  <div class="note-inner"  data-toggle="modal" data-target="#Bill_detail` + new_order[0].order_id + `"><span style="font-size:50px;">Table: `+new_order[1][0].TableID+`<br><h4>ID: ` + new_order[0].order_id + `</h4></span>
  </div>
  </div>`;
  $all.append($bill);

  bill_modal = "";
  bill_modal += `<div class="modal fade" id="Bill_detail` + new_order[0].order_id + `" role="dialog">
  <div class="modal-dialog">

  <!-- Modal content-->
  <div class="modal-content">
  <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
  <h4 class="modal-title">TABLE: `+new_order[1][0].TableID+`</h4>
  </div>
  <div class="modal-body">
  <div class="container-fluid" style="text-align: center;">
  <div class="row">
  <div class="col-md-5 center-margin">
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
  <div id="order_products` + new_order[0].order_id + `">`;

  for (var j = 0; j < new_order[2].length; j++) {
    bill_modal += `<div class="row">
    <div class="col-md-5 center-margin">` + new_order[2][j].ProductName +
    `</div>
    <div class="col-md-2 center-margin">` + new_order[2][j].Quantity +
    `</div>
    <div class="col-md-2 center-margin">` + new_order[2][j].Price +
    `$</div>
    <div class="col-md-2 center-margin">
    <h6></h6>
    </div>
    <div class="col-md-1 center-margin">
    <br>
    </div>
    </div>`;
  }
  bill_modal += `</div>
  </div>
  <div class="row">
  <div class="col-md-1 center-margin"></div>
  <div class="col-md-4 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin"></div>
  <div class="col-md-2 center-margin">
  <h6>` + new_order[1][0].Total + `$</h6>
  </div>
  <div class="col-md-1 center-margin">
  <br>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  $("#all_bills_modal").append(bill_modal);

  // reload("chuaxacnhan", orders, "order_list_waitting", order_modal,"Xác nhận");
  // display_all();

});

var changeStatus = function(order_id){
  var order;
    var data = {
      order_id : order_id,
      iduser: user[0].iduser
    };

  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: "/ThuNgan/changeStatus",
    success: function(data) {
      console.log('success');
      // order = JSON.stringify(data);
      console.log(data);
      console.log(data[1][0].Status);
      console.log(data[0].order_id);
      //Xoa khoi vung can xoa, them vao cho can them
      if(data[1][0].Status == 1){
        $(".note").remove("#note"+data[0].order_id);

        var $bill, $bills;
        $bills = $(".bills");
        $bill = `<div class="note col-md-4" id="note`+data[0].order_id+`">
        <div class="note-inner"  data-toggle="modal" data-target="#Order_detail` + data[0].order_id + `"><span style="font-size:50px;">Table: `+data[1][0].TableID+`<br><h4>ID: ` + data[0].order_id + `</h4></span>
        </div>
        </div>`;
        $bills.append($bill);

        var modal = "";
        modal += `<div class="modal fade" id="Order_detail` + data[0].order_id + `" role="dialog">
        <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
        <h4 class="modal-title">TABLE: `+data[1][0].TableID+`</h4>
        </div>
        <div class="modal-body">
        <div class="container-fluid" style="text-align: center;">
        <div class="row">
        <div class="col-md-5 center-margin">
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
        <div id="order_products` + data[0].order_id + `">`;

        for (var j = 0; j < data[2].length; j++) {
          modal += `<div class="row">
          <div class="col-md-5 center-margin">` + data[2][j].ProductName +
          `</div>
          <div class="col-md-2 center-margin">` + data[2][j].Quantity +
          `</div>
          <div class="col-md-2 center-margin">` + data[2][j].Price +
          `$</div>
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
        <h6>` + data[1][0].Total + `$</h6>
        </div>
        <div class="col-md-1 center-margin">
        <br>
        </div>
        </div>
        </div>
        <div class="modal-footer">
        <div class="container-fluid text-center">
        <button onclick = "changeStatus('`+data[0].order_id+`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto">Thanh toán</button>
        </div>
        </div>
        </div>
        </div>
        </div>`;

        $("#unpaid_bills").append(modal);
        toastr.success('Xác nhận thành công','Success!');
      }else{
        $(".note").remove("#note"+data[0].order_id);

        var $bill, $bills;
        $bills = $(".all_bills");
        $bill = `<div class="note col-md-4" id="note`+data[0].order_id+`">
        <div class="note-inner"  data-toggle="modal" data-target="#Bill_detail` + data[0].order_id + `"><span style="font-size:50px;">Table: `+data[1][0].TableID+`<br><h4>ID: ` + data[0].order_id + `</h4></span>
        </div>
        </div>`;
        $bills.append($bill);

        var modal = "";
        modal += `<div class="modal fade" id="Bill_detail` + data[0].order_id + `" role="dialog">
        <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
        <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
        <h4 class="modal-title">TABLE: `+data[1][0].TableID+`</h4>
        </div>
        <div class="modal-body">
        <div class="container-fluid" style="text-align: center;">
        <div class="row">
        <div class="col-md-5 center-margin">
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
        <div id="order_products` + data[0].order_id + `">`;

        for (var j = 0; j < data[2].length; j++) {
          modal += `<div class="row">
          <div class="col-md-5 center-margin">` + data[2][j].ProductName +
          `</div>
          <div class="col-md-2 center-margin">` + data[2][j].Quantity +
          `</div>
          <div class="col-md-2 center-margin">` + data[2][j].Price +
          `$</div>
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
        <h6>` + data[1][0].Total + `$</h6>
        </div>
        <div class="col-md-1 center-margin">
        <br>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`;

        $("#all_bills_modal").append(modal);

        toastr.success('Thanh toán thành công','Success!');
      }
    }
  });

}
