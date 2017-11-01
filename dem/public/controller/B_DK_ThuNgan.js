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
  console.log(orders);
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
                            <button onclick = "changeStt('`+ (orders.length-1) +`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Xác Nhận </button>
                          </div>
                        </div>
                        </div>
                     </div>
                    </div>`;

  document.getElementById("order_list_waitting").innerHTML = order_modal;
});

// ham nay su dung de xoa toan bo html da su dung truoc do

var removeAllChiled = function() {
  var myNode = document.getElementById("chuaxacnhan");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

var changeStt = function(x) {
  orders[x][0].status =1;
  console.log(orders[x][0].status);
  test();

}
var test = function() {
  console.log("danh sach orders");
  console.log(orders);
  removeAllChiled();
  var length=0 ;

  for (var i = 0; i < orders.length; i++) {
    if (orders[i][0].status == 0) {
      // console.log(x);
      length++;
      var $order, $orders;
      $orders = $(".orders");
      $order = `<div class="note">
                    <div class="note-inner" style="height:` + height + `px;width:` + height + `px" data-toggle="modal" data-target="#Order_detail` +
        length + `"><span style="font-size:50px;">` + orders[i][0].tableID + `</span>
                    </div>
                 </div>`;
      $orders.append($order);

      order_modal += `<div class="modal fade" id="Order_detail` + length + `" role="dialog">
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
      for (var j = 1; j < orders[i].length; j++) {
        total = 0;
        total += orders[i][j].ProductPrice * orders[i][j].number;
        console.log(total);
        order_modal += `<div class="row">
                       <div class="col-md-1 center-margin">
                         1
                       </div>
                       <div class="col-md-4 center-margin">` + orders[i][j].ProductName +
          `</div>
                       <div class="col-md-2 center-margin">` + orders[i][j].number +
          `</div>
                       <div class="col-md-2 center-margin">` + orders[i][j].ProductPrice +
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
                                <button onclick = "changStt('`+i+`')" type="button" data-dismiss="modal" style="position:inherit"class="btn btn-primary mr-auto"> Xác Nhận </button>
                              </div>
                            </div>
                            </div>
                         </div>
                        </div>`;

      document.getElementById("order_list_waitting").innerHTML = order_modal;
    }
  }
}
