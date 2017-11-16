const connection = require('./sql.js')

var getProducts = function (param1, param2, callback) {
    connection.query('SELECT * FROM Products', function (error, result) {
        // console.log(result)
        callback(null, result);

    });
}

function insertProduct(product, callback){
    
    var addStatement = `INSERT INTO Products (ProductName, Price, Categories_CategoryID, Url_images,  Description)
                         VALUES ("${product.ProductName}", "${product.Price}", '1',"images/default.jpg","${product.Description}") `;
    connection.query(addStatement, (error, result)=>{ // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql insert error!:");
            callback('add_error');

        }
        else callback(result);
    }

}
function editProduct(product, callback){
    var editStatement = `UPDATE Products SET ProductName = "${product.ProductName}", Price = "${product.Price}",
                    Categories_CategoryID = "${product.Categories_CategoryID}",  Url_images= "${product.Url_images}", Description= "${product.Description}"
                    WHERE ProductID = "${product.ProductID}"`
    connection.query(editStatement, (error, result) => { // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql insert error! :");
            callback('error');
        }
        else callback("edit successfull");
    })   
}
function deleteProduct(product, callback) {
    // console.log(id);
    var editStatement = `DELETE FROM Products
                    WHERE ProductID = "${product.ProductID}"`
    connection.query(editStatement, (error, result) => { // query tra lai ham callback 2 bien error, result 
        if (error) {
            console.log("sql delete error! :");
            callback('error');
        }
        else callback("delete successfull");
    })
}
module.exports = {
    getProducts,
    insertProduct,
    editProduct,
    deleteProduct
};