var express = require('express');
var app = express();

//... your code here ...

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));






// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send("Teste Plataforma Umbler");
});







                                
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});