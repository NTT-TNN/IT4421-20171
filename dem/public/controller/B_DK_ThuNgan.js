orders_list = "";
order_modal = "";
height = 100, total = 0;
orders = [];
var socket = io('http://localhost:8000');
socket.on('connect', function() {
  socket.emit('name', {
    name: 'banhang'
  });
})
socket.on("du_lieu", function(order) {
  // console.log('data: ', order);
  orders.push(order);
  var $order, $orders;
  $orders = $(".orders");
  $order = `<div class="note">
                <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Order_detail` +
    orders.length + `"><span style="font-size:50px;">` + orders[orders.length -1][0].tableID + `</span>
                </div>
             </div>`;
  $orders.append($order);

  order_modal += `<div class="modal fade" id="Order_detail` + orders.length + `" role="dialog">
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
    console.log(total);
    order_modal += `<div class="row">
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
  order_modal += `</div>
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
                            <button id =id="xacnhan` + orders.length + `"  type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Xác Nhận </button>
                          </div>
                        </div>
                        </div>
                     </div>
                    </div>`;

  document.getElementById("order_list_waitting").innerHTML = order_modal;
  lol();
});

// ham nay su dung de xoa toan bo html da su dung truoc do

var removeAllChiled = function() {
  var myNode = document.getElementById("chuaxacnhan");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
function createfunc(i) {
    console.log("abc");
    return function() { console.log("My value: " + i); };
}

var changeStt = function(x) {
  console.log("object gui sang");
  console.log(x);
  orders[x][0].status =1;
  // bien[0].status = 1;
  // console.log(bien[0].status);
  test();
}
var test = function() {
  // console.log("danh sach orders");
  // console.log(orders);
  // removeAllChiled();
  //
  // for (orders.length = 0; orders.length < orders.length; orders.length++) {
  //   if (orders[orders.length][0].status == 0) {
  //     // console.log(x);
  //     let x =orders.length;
  //     var $order, $orders;
  //     $orders = $(".orders");
  //     $order = `<div class="note">
  //                   <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Order_detail` +
  //       orders.length + `"><span style="font-size:50px;">` + orders[orders.length][0].tableID + `</span>
  //                   </div>
  //                </div>`;
  //     $orders.append($order);
  //
  //     order_modal += `<div class="modal fade" id="Order_detail` + orders.length + `" role="dialog">
  //       <div class="modal-dialog">
  //
  //         <!-- Modal content-->
  //         <div class="modal-content">
  //           <div class="modal-header" style="bacorders.lengthground-color:#2196F3">
  //             <h4 class="modal-title">Order details</h4>
  //           </div>
  //           <div class="modal-body">
  //               <div class="container-fluid" style="text-align: center;">
  //                 <div class="row">
  //                   <div class="col-md-1 center-margin">
  //                     <h6>TABLE</h6>
  //                   </div>
  //                   <div class="col-md-4 center-margin">
  //                     PRODUCT
  //                   </div>
  //                   <div class="col-md-2 center-margin">
  //                     <h6>NUMBER</h6>
  //                   </div>
  //                   <div class="col-md-2 center-margin">
  //                     <h6>PRICE</h6>
  //                   </div>
  //                   <div class="col-md-2 center-margin">
  //                     <h6>TOTAL</h6>
  //                   </div>
  //                   <div class="col-md-1 center-margin">
  //                     <br>
  //                   </div>
  //                 </div>
  //                 <div id="order_products` + orders.length + `">`;
  //     for (var j = 1; j < orders[orders.length].length; j++) {
  //       total = 0;
  //       total += orders[orders.length][j].ProductPrice * orders[orders.length][j].number;
  //       console.log(total);
  //       order_modal += `<div class="row">
  //                      <div class="col-md-1 center-margin">
  //                        1
  //                      </div>
  //                      <div class="col-md-4 center-margin">` + orders[orders.length][j].ProductName +
  //         `</div>
  //                      <div class="col-md-2 center-margin">` + orders[orders.length][j].number +
  //         `</div>
  //                      <div class="col-md-2 center-margin">` + orders[orders.length][j].ProductPrice +
  //         `.000</div>
  //                     <div class="col-md-2 center-margin">
  //                       <h6></h6>
  //                     </div>
  //                      <div class="col-md-1 center-margin">
  //                        <br>
  //                      </div>
  //                    </div>`;
  //     }
  //     order_modal += `</div>
  //                               </div>
  //                               <div class="row">
  //                                  <div class="col-md-1 center-margin"></div>
  //                                  <div class="col-md-4 center-margin"></div>
  //                                  <div class="col-md-2 center-margin"></div>
  //                                  <div class="col-md-2 center-margin"></div>
  //                                 <div class="col-md-2 center-margin">
  //                                   <h6>` + total + `.000</h6>
  //                                 </div>
  //                                  <div class="col-md-1 center-margin">
  //                                    <br>
  //                                  </div>
  //                                </div>
  //                           </div>
  //                           <div class="modal-footer">
  //                             <div class="container-fluid text-center">
  //                               <button id =id="xacnhan` + orders.length + `"  type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Xác Nhận </button>
  //                             </div>
  //                           </div>
  //                           </div>
  //                        </div>
  //                       </div>`;
  //
  //     document.getElementById("order_list_waitting").innerHTML = order_modal;
  //   }
  // }
}

var lol =function () {
  for (z=1; z<orders.length +1; z++) {
    var e1 =document.getElementById("xacnhan"+z);
    if(e1){
      console.log("ton tai");
       e1.addEventListener('click', (function(){
          var num = z;
          return function() {
              console.log("ton tai 1");
          }
      })());
    }else {
      console.log("da chay ham");
    }
  }
}
