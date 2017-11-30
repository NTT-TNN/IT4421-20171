var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akonakon",
    database: "test_it4421"
});
var getProducts = function (param1, param2, callback) {
    connection.query('SELECT * FROM products', function (error, result) {
        // console.log(result)
        callback(null, result);

    });
}
var getProduct = function (param1, param2, callback) {
    connection.query('SELECT * FROM products where ProductID ='+param1, function (error, result) {
        console.log('SELECT * FROM products where ProductID =' + param1);
        callback(result);
    });
}



function insertProduct(param1, product ,callback){
    var CategoryID = 1;
    if(product.productType == "coffee"){
      CategoryID = 1;
    }else if(product.productType == "cake"){
      CategoryID = 2;
    }else{
      CategoryID = 3;
    }
    var addStatement = "INSERT INTO products (ProductName, Price, Categories_CategoryID, Url_images,  descriptions) VALUES ('"+product.productName+"', "+product.productPrice+", '"+CategoryID+"','"+escape(param1)+"','"+product.productDescription+"');";
    console.log(addStatement);
    connection.query(addStatement, function(error, result){ // query tra lai ham callback 2 bien error, result
        callback(error,result);
    });

}
function editProduct(param1,product, callback){
  var CategoryID = 1;
  if(product.productType == "coffee"){
    CategoryID = 1;
  }else if(product.productType == "cake"){
    CategoryID = 2;
  }else{
    CategoryID = 3;
  }
    if (param1) {
      var editStatement = "UPDATE products SET ProductName = '"+product.editProductName+"', Price = "+product.editProductPrice+",Categories_CategoryID = "+CategoryID+",  Url_images= '"+escape(param1)+"', descriptions= '"+product.editProductDescription+"' WHERE ProductID = "+product.editProductID+";";
      console.log(editStatement);
      connection.query(editStatement, function(error, result) { // query tra lai ham callback 2 bien error, result
          callback(error,result);
      });
    }else {
      var editStatement = "UPDATE products SET ProductName = '"+product.editProductName+"', Price = "+product.editProductPrice+",Categories_CategoryID = "+CategoryID+", descriptions= '"+product.editProductDescription+"' WHERE ProductID = "+product.editProductID+";";
      console.log(editStatement);
      connection.query(editStatement, function(error, result) { // query tra lai ham callback 2 bien error, result
          callback(error,result);
      });
    }

}

function deleteProduct(product, callback) {
    // console.log(id);
    var editStatement = `DELETE FROM products
                    WHERE ProductID = "${product.ProductID}"`
    connection.query(editStatement, (error, result) => { // query tra lai ham callback 2 bien error, result
        if (error) {
            console.log("sql delete error! :");
            // callback('error');
        }
        else callback("delete successfull");
    })
}
module.exports = {
    getProduct,
    getProducts,
    insertProduct,
    editProduct,
    deleteProduct
};
