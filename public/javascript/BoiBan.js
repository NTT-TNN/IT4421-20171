
tableNumber = 0;
flagEdit=false;
var table={};
orders=[];
$('#table_modal').hide().on('hide', function() {
    $('#table_modal').modal('show')
});
function addTable(){
  tableNumber=document.getElementById("table_number").value;
  console.log(tableNumber);
  table={
    tableID:tableNumber,
    status:0
  }
  console.log(table);
  orders.push(table);
  document.getElementById("table_number").value="";
}


$("#table_modal").modal({show: true});
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
var socket = io("http://localhost:8000");
socket.on('connect', function() {
  console.log('hello');
  socket.emit('name', {name: 'order'});
})

function addDoUong(i){

  var ProductID= products[i].ProductID;
  var ProductName= products[i].ProductName;
  var ProductUrl= products[i].Url_images;
  var ProductPrice=products[i].Price;
  var number= parseInt(document.getElementById(ProductID).value);
  // var number=1;
  product={
    ProductID: ProductID,
    number:number,
    ProductName:ProductName,
    ProductUrl:ProductUrl,
    ProductPrice:ProductPrice
  }
  console.log(orders);
  if(orders.length==0){
    orders.push(product);
  }else{
    var flag=true;
    for(var j=0;j<orders.length;++j){

      if(orders[j].ProductID==ProductID){
        orders[j].number+=number;
        flag=false;
      }
    }
    if(flag==true){
      orders.push(product);
    }
  }
  html="";
  total=0;
  for(var j=1;j<orders.length;++j){

    total+=orders[j].ProductPrice*orders[j].number;
    html+=`<div class="row" id="doUong`+j+`">
       <div class="col-md-1 center-margin">
         1
       </div>
       <div class="col-md-4 center-margin">` + orders[j].ProductName +
       `</div>
       <input class="col-md-2 center-margin ordernumber" readonly style="border: none;"value='`+orders[j].number+`'>
       <div class="col-md-2 center-margin">` + orders[j].ProductPrice+
      `.000</div>
      <div class="col-md-2 center-margin">
       <img src="images/icon/error.png" alt="" onclick="removeDoUong('`+j+`')">
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
        <h6 id="total">`+total+ `.000</h6>
      </div>
       <div class="col-md-1 center-margin">
         <br>
       </div>
     </div>`;
    document.getElementById("order_products").innerHTML = html;
    html="";
    return true
};

function guiDonHang(){
  if(orders.length>1){
    if(flagEdit===true){
      var x = $(".ordernumber");
      x.attr("readonly", false).addClass("form-control");
      x.each(function(i){
        orders[i+1].number=this.value;
      })
      flagEdit=false;
    }
    console.log(orders);
    socket.emit("order",orders);
    orders=[];
    // orders.push(table);
    toastr.success('Gửi đơn hàng thành công','Success!');
    document.getElementById("order_products").innerHTML = html;
    return true;
  }else {
    toastr.error('Đơn hàng rỗng','Error!',{timeOut: 20000});
    return false;
  }
  $("#table_modal").modal({show: true});
}

function editOrder(){
  flagEdit=true;
  var x = $(".ordernumber");
  x.attr("readonly", false).addClass("form-control");
  console.log(x);
}

  function removeDoUong(i){
    total -= orders[i].number*orders[i].ProductPrice;
    var htmlTotal=total+".000"
    $("#total").html(htmlTotal);
    orders.splice(i, 1);
    var doUongId="doUong"+i;
    $("#doUong"+i).remove();
    console.log(total);
    console.log("sau remove");

  }
