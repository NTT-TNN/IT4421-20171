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
});

socket.on("order", function(new_order) {
  $(".modal-backdrop").remove();
  console.log("data: ", new_order);

  //hien thi don hang moi
  var $order, $orders;
  $orders = $(".orders");
  $order = `<div class="note" id="note`+new_order[0].order_id+`">
  <div class="note-inner" style="height: 100px;width:100px" data-toggle="modal" data-target="#New_order_detail` + new_order[0].order_id + `"><span style="font-size:50px;">` + new_order[0].order_id + `</span>
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
  $bill = `<div class="note" >
  <div class="note-inner" style="height: 100px;width:100px" data-toggle="modal" data-target="#Bill_detail` + new_order[0].order_id + `"><span style="font-size:50px;">` + new_order[0].order_id + `</span>
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
        $bill = `<div class="note" id="note`+data[0].order_id+`">
        <div class="note-inner" style="height: 100px;width:100px" data-toggle="modal" data-target="#Order_detail` + data[0].order_id + `"><span style="font-size:50px;">` + data[0].order_id + `</span>
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
      }else if(data[1][0].Status == 2){
        $(".note").remove("#note"+data[0].order_id);
      }
    }
  });

}

// ham nay su dung de xoa toan bo html da su dung truoc do

// var removeAllChiled = function(id) {
//   var myNode = document.getElementById(id);
//   while (myNode.firstChild) {
//     myNode.removeChild(myNode.firstChild);
//   }
// }
//
// var changeStt = function(x) {
//   if(orders[x][0].status == 0){
//     orders[x][0].status = 1;
//     reload("chuaxacnhan", orders, "order_list_waitting", order_modal,"Xác nhận");
//
//     var $bill, $bills;
//     $bills = $(".bills");
//     $bill = `<div class="note">
//     <div class="note-inner" style="height: 100px;width:100px" data-toggle="modal" data-target="#Order_detail` +
//     (x+1) + `"><span style="font-size:50px;">` + orders[x][0].tableID + `</span>
//     </div>
//     </div>`;
//     $bills.append($bill);
//
//     unpaid_bills += `<div class="modal fade" id="Order_detail` + (x+1) + `" role="dialog">
//     <div class="modal-dialog">
//
//     <!-- Modal content-->
//     <div class="modal-content">
//     <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
//     <h4 class="modal-title">Order details</h4>
//     </div>
//     <div class="modal-body">
//     <div class="container-fluid" style="text-align: center;">
//     <div class="row">
//     <div class="col-md-1 center-margin">
//     <h6>TABLE</h6>
//     </div>
//     <div class="col-md-4 center-margin">
//     PRODUCT
//     </div>
//     <div class="col-md-2 center-margin">
//     <h6>NUMBER</h6>
//     </div>
//     <div class="col-md-2 center-margin">
//     <h6>PRICE</h6>
//     </div>
//     <div class="col-md-2 center-margin">
//     <h6>TOTAL</h6>
//     </div>
//     <div class="col-md-1 center-margin">
//     <br>
//     </div>
//     </div>
//     <div id="order_products` + orders[x].length + `">`;
//     total = 0;
//     console.log(orders[x]);
//     for (var j = 1; j < orders[x].length; j++) {
//       total += orders[x][j].ProductPrice * orders[x][j].number;
//       unpaid_bills += `<div class="row">
//       <div class="col-md-1 center-margin">
//       1
//       </div>
//       <div class="col-md-4 center-margin">` + orders[x][j].ProductName +
//       `</div>
//       <div class="col-md-2 center-margin">` + orders[x][j].number +
//       `</div>
//       <div class="col-md-2 center-margin">` + orders[x][j].ProductPrice +
//       `.000</div>
//       <div class="col-md-2 center-margin">
//       <h6></h6>
//       </div>
//       <div class="col-md-1 center-margin">
//       <br>
//       </div>
//       </div>`;
//     }
//     unpaid_bills += `</div>
//     </div>
//     <div class="row">
//     <div class="col-md-1 center-margin"></div>
//     <div class="col-md-4 center-margin"></div>
//     <div class="col-md-2 center-margin"></div>
//     <div class="col-md-2 center-margin"></div>
//     <div class="col-md-2 center-margin">
//     <h6>` + total + `.000</h6>
//     </div>
//     <div class="col-md-1 center-margin">
//     <br>
//     </div>
//     </div>
//     </div>
//     <div class="modal-footer">
//     <div class="container-fluid text-center">
//     <button onclick = "thanhToan('`+ x +`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Thanh toán </button>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>`;
//     document.getElementById("unpaid_bills").innerHTML = unpaid_bills;
//   }else if(orders[x][0].status == 1){
//     orders[x][0].status = 2;
//     reload("chuathanhtoan",orders,"unpaid_bills",unpaid_bills, "Thanh Toán");
//   }
// }
//
// function thanhToan(i){
//   orders[i][0].status = 2;
//   reload("chuathanhtoan",orders,"unpaid_bills",unpaid_bills, "Thanh Toán");
//   var data=orders[i];
//   var id = {
//     userid : user[0].iduser
//   };
//   data.push(id);
//   console.log(data);
//   $.ajax({
//     type: 'POST',
//     data: JSON.stringify(data),
//     contentType: 'application/json',
//     url: "/ThuNgan/thanhToan",
//     success: function(data) {
//       console.log('success');
//       console.log(JSON.stringify(data));
//     }
//   });
// }
//
// var reload = function(id_list,list,id_modal,modal,button){
//   var status;
//   if(id_list == "chuaxacnhan"){
//     status = 0;
//   }else{
//     status = 1;
//   }
//   modal = "";
//   removeAllChiled(id_list);
//   id_list = "#"+id_list;
//   var length = 0 ;
//
//   for (var i = 0; i < list.length; i++) {
//     length++;
//     if (list[i][0].status == status) {
//       var $element, $arr;
//       $arr = $(id_list);
//       $element = `<div class="note">
//       <div class="note-inner" style="height:100px;width: 100px" data-toggle="modal" data-target="#Order_detail` +
//       length + `"><span style="font-size:50px;">` + list[i][0].tableID + `</span>
//       </div>
//       </div>`;
//       $arr.append($element);
//
//       modal += `<div class="modal fade" id="Order_detail` + length + `" role="dialog">
//       <div class="modal-dialog">
//
//       <!-- Modal content-->
//       <div class="modal-content">
//       <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
//       <h4 class="modal-title">Order details</h4>
//       </div>
//       <div class="modal-body">
//       <div class="container-fluid" style="text-align: center;">
//       <div class="row">
//       <div class="col-md-1 center-margin">
//       <h6>TABLE</h6>
//       </div>
//       <div class="col-md-4 center-margin">
//       PRODUCT
//       </div>
//       <div class="col-md-2 center-margin">
//       <h6>NUMBER</h6>
//       </div>
//       <div class="col-md-2 center-margin">
//       <h6>PRICE</h6>
//       </div>
//       <div class="col-md-2 center-margin">
//       <h6>TOTAL</h6>
//       </div>
//       <div class="col-md-1 center-margin">
//       <br>
//       </div>
//       </div>
//       <div id="order_products` + length + `">`;
//       total = 0;
//       for (var j = 1; j < list[i].length; j++) {
//         total += list[i][j].ProductPrice * list[i][j].number;
//         modal += `<div class="row">
//         <div class="col-md-1 center-margin">
//         1
//         </div>
//         <div class="col-md-4 center-margin">` + list[i][j].ProductName +
//         `</div>
//         <div class="col-md-2 center-margin">` + list[i][j].number +
//         `</div>
//         <div class="col-md-2 center-margin">` + list[i][j].ProductPrice +
//         `.000</div>
//         <div class="col-md-2 center-margin">
//         <h6></h6>
//         </div>
//         <div class="col-md-1 center-margin">
//         <br>
//         </div>
//         </div>`;
//       }
//       modal += `</div>
//       </div>
//       <div class="row">
//       <div class="col-md-1 center-margin"></div>
//       <div class="col-md-4 center-margin"></div>
//       <div class="col-md-2 center-margin"></div>
//       <div class="col-md-2 center-margin"></div>
//       <div class="col-md-2 center-margin">
//       <h6>` + total + `.000</h6>
//       </div>
//       <div class="col-md-1 center-margin">
//       <br>
//       </div>
//       </div>
//       </div>
//       <div class="modal-footer">
//       <div class="container-fluid text-center">
//       <button onclick = "changeStt('`+i+`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto">`+button+` </button>
//       </div>
//       </div>
//       </div>
//       </div>
//       </div>`;
//
//       document.getElementById(id_modal).innerHTML = modal;
//     }
//   }
// }
//
// var display_all = function(){
//   $all = $(".all_bills");
//   $element = `<div class="note">
//   <div class="note-inner" style="height:100px;width:100px" data-toggle="modal" data-target="#Bill_detail` +
//   orders.length + `"><span style="font-size:50px;">` + orders[orders.length-1][0].tableID + `</span>
//   </div>
//   </div>`;
//   $all.append($element);
//   all_bills +=`<div class="modal fade" id="Bill_detail` + orders.length + `" role="dialog">
//   <div class="modal-dialog">
//
//   <!-- Modal content-->
//   <div class="modal-content">
//   <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
//   <h4 class="modal-title">Order details</h4>
//   </div>
//   <div class="modal-body">
//   <div class="container-fluid" style="text-align: center;">
//   <div class="row">
//   <div class="col-md-1 center-margin">
//   <h6>TABLE</h6>
//   </div>
//   <div class="col-md-4 center-margin">
//   PRODUCT
//   </div>
//   <div class="col-md-2 center-margin">
//   <h6>NUMBER</h6>
//   </div>
//   <div class="col-md-2 center-margin">
//   <h6>PRICE</h6>
//   </div>
//   <div class="col-md-2 center-margin">
//   <h6>TOTAL</h6>
//   </div>
//   <div class="col-md-1 center-margin">
//   <br>
//   </div>
//   </div>
//   <div id="order_products` + orders.length + `">`;
//   total = 0;
//   for (var j = 1; j < orders[orders.length-1].length; j++) {
//     total += orders[orders.length-1][j].ProductPrice * orders[orders.length-1][j].number;
//     all_bills += `<div class="row">
//     <div class="col-md-1 center-margin">
//     1
//     </div>
//     <div class="col-md-4 center-margin">` + orders[orders.length-1][j].ProductName +
//     `</div>
//     <div class="col-md-2 center-margin">` + orders[orders.length-1][j].number +
//     `</div>
//     <div class="col-md-2 center-margin">` + orders[orders.length-1][j].ProductPrice +
//     `.000</div>
//     <div class="col-md-2 center-margin">
//     <h6></h6>
//     </div>
//     <div class="col-md-1 center-margin">
//     <br>
//     </div>
//     </div>`;
//   }
//   all_bills += `</div>
//   </div>
//   <div class="row">
//   <div class="col-md-1 center-margin"></div>
//   <div class="col-md-4 center-margin"></div>
//   <div class="col-md-2 center-margin"></div>
//   <div class="col-md-2 center-margin"></div>
//   <div class="col-md-2 center-margin">
//   <h6>` + total + `.000</h6>
//   </div>
//   <div class="col-md-1 center-margin">
//   <br>
//   </div>
//   </div>
//   </div>
//   </div>
//   </div>
//   </div>`;
//
//   document.getElementById("all_bills_modal").innerHTML = all_bills;
// }
