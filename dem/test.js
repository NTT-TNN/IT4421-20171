var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Tao mot parser co dang application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/get', function (req, res) {
   res.sendFile( __dirname + "/" + "get.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Chuan bi output trong dinh dang JSON
   console.log(req);
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})
