
function displayEditForm(id){
    var description,category,url,name,price;
    for (i = 0; i < products.length; i++) {
      if(products[i].ProductID == id){
          console.log("ok");
          description = products[i].descriptions;
          url = products[i].Url_images;
          category = products[i].Categories_CategoryID;
          price = products[i].Price;
          name = products[i].ProductName;
          console.log("gia cua no "+price);
      }
    }
    document.getElementById("ProductName").value = name;
    document.getElementById("Price").value = price;
    document.getElementById("Description").value = description;
    document.getElementById("Url_images").setAttribute("src",url);
    document.getElementById("ProductID").value =id;
    // $("#save_btn").click(function () {
    //     console.log("hello")
    //     update_product = {
    //         ProductID: id,
    //         ProductName: name,
    //         Description:description,
    //         Price: price2,
    //         Url_images: url,
    //         Categories_CategoryID: category,
    //     };
    //     console.log(update_product);
    //     editProduct(JSON.stringify(update_product));
    //     document.getElementById("cafe" +id).innerText = document.getElementById("ProductName").value;
    //     document.getElementById("price"+id).innerText= document.getElementById("Price").value;
    // })
}

function createProductHTML(product){
    return `<div class="item  col-xs-4 col-lg-4" id="`+product.ProductID+`" >
        <div class="thumbnail">
            <img width="400" height="250" class="group list-group-image" src="` + product.Url_images + `" alt="" />
            <div class="caption">
                <h4 class="group inner list-group-item-heading" id="cafe`+product.ProductID+`">
                    `+ product.ProductName + `
                </h4>
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
                        <a onclick="displayDeleteConfirmForm('`+product.ProductID+`');" class="btn btn-success" data-toggle="modal"
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
    $.ajax({
        url: "/QuanLy/add",
        type : "POST",
        data: JSON.stringify(addedProduct),
        contentType: 'application/json',
        success: function (addProduct) {
            console.log(addProduct);
            var newProducthtml = createProductHTML(addProduct)
            $("#productsForm").append(newProducthtml);
            products.push(addProduct);
            console.log("successful!");
            console.log(products);
        }
    });

}
function editProduct(update_product){
    $.ajax({
        url: "/QuanLy/edit",
        type: "POST",
        data: update_product,
        contentType: 'application/json',
        success: function () {
            // $("#results").append(html);
            console.log("successful!")
        }
    });
}
function displayDeleteConfirmForm(id){
    console.log(id);
    $("#deleteConfirm_btn").click(function () {
        deleteProduct(id)
    })
}
function deleteProduct(id){
    $.ajax({
        url: "/QuanLy/delete",
        type: "POST",
        data: JSON.stringify({
            ProductID: id
        }),
        contentType: 'application/json',
        success: function () {
            document.getElementById(id).setAttribute("style","display : none;");
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
