// var len = products.length;
function addProduct(){
    product = {
        ProductName: $("#AddProductName").val(),
        Description: $("#AddProductDescription").val(),
        Price: $("#AddProductPrice").val(),
        Url_images: $("#AddUrl_images").attr("src")
        // Categories_CategoryID: product.Categories_CategoryID
    };

    // $("#s_img").click(function(){
    //     var html=`<img width="400" height="250" class="group list-group-image" id="AddUrl_images" alt="" />`
    //     $(html).replaceAll("#AddUrl_images");
    // })

    $.ajax({
        url: "DK_QuanLy/add",
        type: "POST",
        data: JSON.stringify(product),
        contentType: "application/json",
        success: function(){
            var l = products.push(product) -1;
            var newProducthtml = `<div class="item  col-xs-4 col-lg-4" id="` + l + `">
                                    <div class="thumbnail">
                                        <img width="400" height="250" class="group list-group-image" src="` +products[l].Url_images+ `" alt="" />
                                        <div class="caption">
                                            <h4 class="group inner list-group-item-heading" id="cafe01">
                                                `+products[l].ProductName +`
                                            </h4>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <p class="lead">
                                                        $`+
                                                        products[l].Price+`

                                                    </p>
                                                </div>
                            
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">
                                                </div>
                                                <div class="col-xs-6" style="margin-top:-30px;">
                                                    <div class="col-md-3 .col-md-offset-3" style="padding-left: 20; margin-right: 20px;">
                                                        <a onclick="displayEditForm(`+ l +`)" class="btn btn-success" data-toggle="modal" data-target="#editForm">Edit</a>
                                                    </div>
                                                    <div class="col-md-3 .col-md-offset-3" style="padding-left: 20;padding-right: 0;">
                                                        <a onclick="displayDeleteConfirmForm(`+ l +`)" class="btn btn-success" data-toggle="modal"
                                                            data-target="#deleteConfirmForm">Delete</a>
                                                    </div>
                                                </div>
                            
                            
                                            </div>
                                        </div>
                                    </div>
                                </div>`
            $("#productsForm").append(newProducthtml);
            console.log("add_ahihi");
        }
    });

}

// var products = $.get("DK_QuanLy/get");


function displayEditForm(i){
    console.log(i);
    console.log(products[i].ProductName);

    $("#ProductName").val(products[i].ProductName);
    $("#Description").val(products[i].Description);
    $("#Price").val(products[i].Price);
    $("#Url_images").attr("src",products[i].Url_images);
    $("#save_btn").click(function () {
        // console.log(products[i].ProductID);
        update_product = {
            ProductID: products[i].ProductID,
            ProductName: $("#ProductName").val(),
            Description: $("#Description").val(),
            Price: $("#Price").val(),
            Url_images: products[i].Url_images,
            Categories_CategoryID: products[i].Categories_CategoryID
        };

        editProduct(JSON.stringify(update_product));
        var s=`#`+i;
            var changeProducthtml = `<div class="item  col-xs-4 col-lg-4" id="` + i + `">
                                        <div class="thumbnail">
                                        <img width="400" height="250" class="group list-group-image" src="` +update_product.Url_images+ `" alt="" />
                                        <div class="caption">
                                            <h4 class="group inner list-group-item-heading" id="cafe01">
                                                `+update_product.ProductName +`
                                            </h4>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <p class="lead">
                                                        $`+
                                                        update_product.Price+`

                                                    </p>
                                                </div>
                            
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">
                                                </div>
                                                <div class="col-xs-6" style="margin-top:-30px;">
                                                    <div class="col-md-3 .col-md-offset-3" style="padding-left: 20; margin-right: 20px;">
                                                        <a onclick="displayEditForm(`+ i+`)" class="btn btn-success" data-toggle="modal" data-target="#editForm">Edit</a>
                                                    </div>
                                                    <div class="col-md-3 .col-md-offset-3" style="padding-left: 20;padding-right: 0;">
                                                        <a onclick="displayDeleteConfirmForm(`+ i+`)" class="btn btn-success" data-toggle="modal"
                                                            data-target="#deleteConfirmForm">Delete</a>
                                                    </div>
                                                </div>
                            
                            
                                            </div>
                                        </div>
                                    </div>
                                    </div>`    
            $(changeProducthtml).replaceAll(s);
    });
}

function editProduct(update_product){
    // console.log(update_product.ProductName);
    $.ajax({
        url: "DK_QuanLy/edit",
        type: "POST",
        data: update_product,
        contentType: "application/json",
        success: function(){
            console.log("edit_ahihi");
        }
    });
}

function displayDeleteConfirmForm(i){
    var s=`#`+i;
    $("#deleteConfirm_btn").click(function () {
        // var p=products.splice(i,1);
        // console.log(p.ProductName);
        deleteProduct(products[i].ProductID);
        $(s).remove();
    })
}

function deleteProduct(id){
    $.ajax({
        url: "/DK_QuanLy/delete",
        type: "POST",
        data: JSON.stringify({
            ProductID: id
        }),
        contentType: 'application/json',
        success: function(){
            console.log("ahihi");
            
        }
    });
}

function status(){
    document.getElementById("pic").style="";
}

function up(){
    console.log("abc");
    $.ajax({
        url:'/DK_QuanLy/upload',
        cache:false,
        contentType:false,
        processData:false,
        async:false,
        success:function(answ){
            // $('#result').html(answ);
        }
    });
}

function addPicture(){

}

function changePicture(){

}

