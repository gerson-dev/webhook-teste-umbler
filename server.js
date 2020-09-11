var express = require('express');
var app = express();

//... your code here ...

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

let bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));




// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.send("Teste Plataforma Umbler");
});


const mysql = require("mysql");
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const MYSQL_DB = process.env.MYSQL_DB;

app.post("/salao",function(request,response){

  let intentName = request.body.queryResult.intent.displayName;

  if (intentName === "agendamento"){

    let nome = request.body.queryResult.parameters['nome-completo2'];
    let fone = request.body.queryResult.parameters['telefone'];

    let sql_query = "insert into cliente values ('"+nome+"','"+fone+"')";

    let connection = mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB
    });

    connection.connect()

        connection.query(sql_query, function(error, results, fields){
            if (error) throw error;
            connection.end()
            
        })


})






                                
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});