
function displayEditForm(id){

    name = document.getElementById("cafe" + id).innerText;
    console.log(name);
    price = document.getElementById("price"+id).innerText;
    price1 = price.substring(1);
    price2 = parseInt(price1);
    console.log(price2);
    description = document.getElementById("des"+id).innerText;
    category = document.getElementById("category"+id).innerText;
    catenumber = parseInt(category);
    url = document.getElementById("url"+id).innerText;
    document.getElementById("ProductName").value = name;
    document.getElementById("Price").value = price2;
    document.getElementById("Description").value = description;
    $("#save_btn").click(function () {
        console.log("hello")
        update_product = {
            ProductID: id,
            ProductName: name,
            Description:description,
            Price: price2,
            Url_images: url,
            Categories_CategoryID: catenumber,
        };
        console.log(update_product);
        editProduct(JSON.stringify(update_product));
        // console.log("#cafe" + product.ProductID);
        // console.log(update_product.ProductName);
        document.getElementById("cafe" +id).innerText = document.getElementById("ProductName").value;
        document.getElementById("price"+id).innerText= document.getElementById("Price").value;
    })
}

function createProductHTML(product){
    console.log(product.ProductID);
    return `<div class="item  col-xs-4 col-lg-4 id="`+product.ProductID+`" >
        <div class="thumbnail">
            <img width="400" height="250" class="group list-group-image" src="` + product.Url_images + `" alt="" />
            <div class="caption">
                <h4 class="group inner list-group-item-heading" id="cafe`+product.ProductID+`">
                    `+ product.ProductName + `
                </h4>
                <p class="group inner list-group-item-text" style="display :none;" id="des`+product.ProductID+`">
                    `+product.Description+`
                </p>
                <p class="group inner list-group-item-text" style="display :none;" id="category`+product.ProductID+`">
                    `+product.Categories_CategoryID+`
                </p>
                <p class="group inner list-group-item-text" style="display :none;" id="url`+product.ProductID+`">
                `+product.Url_images+`
                </p>

                <div class="row">
                    <div class="col-md-4">
                        <p class="lead" id ="price`+product.ProductID+`">
                            $`+
                            product.Price + `

                        </p>
                    </div>

                </div>
                <div class="row">
                    <div class="col-xs-6">
                    </div>
                    <div class="col-xs-6" style="margin-top:-30px;">
                        <div class="col-md-3 .col-md-offset-3" style="padding-left: 20; margin-right: 20px;">
                            <a onclick='displayEditForm(`+product.ProductID+`)' class="btn btn-success" data-toggle="modal" data-target="#editForm">Edit</a>
                        </div>
                        <div class="col-md-3 .col-md-offset-3" style="padding-left: 20;padding-right: 0;">
                            <a onclick='displayDeleteConfirmForm(`+ JSON.stringify(product)+`);' class="btn btn-success" data-toggle="modal"
                                data-target="#deleteConfirmForm">Delete</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>`
}
function addProduct(){
    var addedProduct =
    {
        ProductName: $("#AddProductName").val(),
        Description: $("#AddProductDescription").val(),
        Price: $("#AddProductPrice").val(),
        Url_images: $('#AddUrl_images').attr('src'),
    }
    console.log(products);
    // console.log($("#AddProductName").val())
    $.ajax({
        url: "/DK_QuanLy/add",
        type : "POST",
        data: JSON.stringify(addedProduct),
        contentType: 'application/json',
        success: function (addProduct) {
            console.log(addProduct);
            var newProducthtml = createProductHTML(addProduct)
            $("#productsForm").append(newProducthtml);
            products.push(addProduct);
            // $("#results").append(html);
            // $("newProductForm").
            console.log("successful!")
        }
    });

}
function editProduct(update_product){
    // console.log($("#ProductName").val())
    // console.log(update_product);
    $.ajax({
        url: "/DK_QuanLy/edit",
        type: "POST",
        data: update_product,
        contentType: 'application/json',
        success: function () {
            // $("#results").append(html);
            console.log("successful!")
        }
    });
}
function displayDeleteConfirmForm(product){
    // console.log(i);
    var product = JSON.parse(product);
    // console.log(product.ProductID);
    $("#deleteConfirm_btn").click(function () {
        // console.log("hello")
        // update_product = JSON.stringify({
        //     ProductID: product.ProductID,
        //     ProductName: $("#ProductName").val(),
        //     Description: $("#Description").val(),
        //     Price: $("#Price").val(),
        //     Url_images: product.Url_images,
        //     Categories_CategoryID: product.Categories_CategoryID
        // });
        // console.log(i);
        // console.log(product.ProductID)
        deleteProduct(product.ProductID)

    })
}
function deleteProduct(id){
    // console.log(typeof(id.toString()));
    $.ajax({
        url: "/DK_QuanLy/delete",
        type: "POST",
        data: JSON.stringify({
            ProductID: id
        }),
        contentType: 'application/json',
        success: function () {
            // $("#results").append(html);
            var index = -1;
            for(var i; i< products.length; i++){
                if (products[i].ProductID == id){
                    index = i;
                }
            }
            for(var i=index; i<products.length; i++){
                elem = produts[i];
                elem.parentNode.removeChild(elem);
            }
            // document.getElementById("product"+i);

            console.log("successful!")
        }
    });
}
function changeAddPicture(id){

    // $("#"+id).atrr("scr", )
}
// function displayDeleteForm(){

// }
// function display(){

// }
// function displayConfirm(){

// }
