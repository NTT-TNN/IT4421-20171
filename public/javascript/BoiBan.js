
  tableNumber = 0;
  flagEdit=false;
  var table={};
  // orders=[];


  $('#table_modal').hide().on('hide', function() {
      $('#table_modal').modal('show');
  });


  function addTable(){
    tableNumber=document.getElementById("table_number").value;
    if(tableNumber != ""){
      $("#modal_table").val(tableNumber);
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
    }

  }

  if(sessionStorage.length == 0){
    $("#table_modal").modal({show: true});
    $("#table").show();
  }else {
    $("#table").hide();

    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    $("#modal_table").val(cartObj[0].tableID);
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
        `.000</div>
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
          <h6 id="total">`+total+ `.000</h6>
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
  var socket = io("http://localhost:8000");
  socket.on('connect', function() {
    console.log('hello');
    socket.emit('name', {name: 'order'});
  })

  function addDoUong(i){
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    if(cartObj[0].tableNumber != ""){
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
           <div class="col-md-1 center-margin">
             1
           </div>
           <div class="col-md-4 center-margin">` + cartObj[j].ProductName +
           `</div>
           <input class="col-md-2 center-margin ordernumber" readonly style="border: none;"value='`+cartObj[j].number+`'>
           <div class="col-md-2 center-margin">` + cartObj[j].ProductPrice+
          `.000</div>
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
            <h6 id="total">`+total+ `.000</h6>
          </div>
           <div class="col-md-1 center-margin">
             <br>
           </div>
         </div>`;
        document.getElementById("order_products").innerHTML = html;
        html="";
        return true;
    }else {
      toastr.error('Chưa điền số bàn','Error!',{timeOut: 20000});
    }

  };

  function guiDonHang(){
    $("#table").show();
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
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
      return true;
    }else { // Don hang rong
      toastr.error('Đơn hàng rỗng','Error!',{timeOut: 20000});
      return false;
    }
    $("#table_modal").modal({show: true});
  }

  function editOrder(){
    // flagEdit=true;
    var y= $(".ordernumber");
    y.attr("readonly", false).addClass("form-control");
    var modal_table = $("#modal_table");
    modal_table.attr("readonly", false).addClass("form-control");
    var cartValue = sessionStorage.getItem( "cart" );
    var cartObj = JSON.parse(cartValue);
    $(".destroydouong").hide();
    $("#editBTN").hide();
    $("#OKedit").show();
    $("#OKedit").click(function(){
      $(".destroydouong").show();
      cartObj[0].tableID=modal_table.value ;
      var x = $(".ordernumber");
      x.attr("readonly", false).addClass("form-control");
      x.each(function(i){
          cartObj[i+1].number=this.value;
      })
      sessionStorage.setItem("cart",JSON.stringify(cartObj));
      $("#editBTN").show();
      $("#OKedit").hide();
      var total1=0;
      for(var j=1;j<cartObj.length;++j){
        total1+=cartObj[j].ProductPrice*cartObj[j].number;
      }
      $("#total").text(total1+".000");
      total = total1;
    });
  }

    function removeDoUong(i){
      var cartValue = sessionStorage.getItem( "cart" );
      var cartObj = JSON.parse(cartValue);
      total -= cartObj[i].number*cartObj[i].ProductPrice;
      var htmlTotal=total+".000"
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
          `.000</div>
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
            <h6 id="total">`+total+ `.000</h6>
          </div>
           <div class="col-md-1 center-margin">
             <br>
           </div>
         </div>`;
        document.getElementById("order_products").innerHTML = html;
        html="";
      console.log(total);
    }
