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

const {google} = require('googleapis');
const calendarId = "s1simiov0j4uvpjfnvvb0vcgdo@group.calendar.google.com";
const serviceAccount = {
  "type": "service_account",
  "project_id": "sal-o-com-agendamento-nxfk",
  "private_key_id": "28fc172e14f719c37a992956033f690a1bc2f15b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDpkPPmnac5sDZ8\nD294UKcorYjs31TSlfSAIir6pwUr3NPUKcVkWi46Z0mSxpxXcCP5M7Bxeau5oZEY\npSk2nwKbzByK/IV7u348jKmjDefmpNmRyx8w51TOUgUGTTcMXG6fjlEAZR3UAepM\nEAPBZlm/I+0bEsDnCB3YMWJSNhCUd6hkF5tBpZloq2UjlkNmbUlvoHks65bX6PDU\n1N6+2uack3hOsaisoeqt1k18qHKL4ZkfuBrsdXmvbSMlGdtlRI4+tkZJCMw6bwHl\nnsCZFbjHz/aoEP5wFMoSc/x/2ELPeSs9CezcSszdq6n6mNaTYGBUyXKcVCEsd55M\n6KnbGQxjAgMBAAECggEACApFWxryNroqJfsiCzI7jtrqa70EXntq/z4t3JMDSo8/\ne340nU+9Z6VGkxbjKt9hXaK54C4gCzPUmtSUppyyqkpMcTxgG/JIVi1BaauA4B+s\nnagwWq6b7L5GDgF6c6J67GMpxqm0bSfjuNqURoQPctT5xITQvyM4Y8jPaaUSzQmA\nnBp+CZejTydlYP8aGm7aGNFn+Gaet3LWk5XUcce8Iv0MevhMgfOWO5yBjZDGQxDN\nLMmmkeZijJOr6R7fsJEjbYwt3g7fTbf+3cC4apSDXEOqOrawXcYgYXUktI9j2su+\n9Q5MPPnrHdkPIPgXaUzCPxujzAJtS7GUxI7v1V9CAQKBgQD4iH1146EYepXPp7x4\nr4vXDGAYNne3oXZog90ge6gEEWbbYa844yVqPrawDRwyAfTnANVigFUS0zaXnAFI\n9QYRY1UGC5MognYIgsv6yOxqN8NH9DfFYwzyzkoOfKPYmlNBHfaykrQp89VI+Qa9\n1XcHu59MVzmrpCx38layl27c0QKBgQDwlVly+YPyitO1NllwqviJHsTUDGZa5JGf\nMLHW0T/UnhqEab5pLVVyAA+YqWIPFOyrIb4G/4kzr+7F/7O20GCH5lFuSLkdwDjo\nZK+TgnBZXjsmt2AiwdqpA/2n6yMenK7LKke7u0XU3nhPhxshqXd37rziOYDkf1fO\nghfSdprS8wKBgQCZrWxGlTZruIEiIgn8ZjAGDXTuA+ALACADiGYXS98chNYhGUoL\n1wivpY+5VKH2mhchL/bCLbBtL4U2QhTZVAkof093qXiZN/JcWORgchUdqNVrjKtf\ntluvV7ebNZ7qtKJ+RVTiHqygtFFSCgoNIA22DmH2Bol2hNGqaYMKc3DtwQKBgBEr\nR1/qKJ11hNhI0ac1vFjkxj0vyVoxN6c5rWdcNYbx5YiPl1QgNRnWoUZOyD21S5KG\n7O3I7LywkIS209d3FXx9VlBdhkB2SFllXhZT17q4+9WufoDcfsNTEpYaNL5phhvf\nn5DpM3mWitV6GdiUJH99nSMz4VvtLpIBPLv7VN87AoGBAKBJuIKEFO1jPqRUQQN2\nk2ymbVQdgqjJ9T13UsNAr0mGbAv4yy+hAtkrmOrQ/kjAMQlz6QRsyL34eKQACvr7\nO56rr9OfdAZkF7vxR0R1abUY2RCM910kScvgu4NhBCgysZRD1f36lJW/C4JFHIO1\n+9bECIS5FAzmcWEWfXSzgMeP\n-----END PRIVATE KEY-----\n",
  "client_email": "calendario@sal-o-com-agendamento-nxfk.iam.gserviceaccount.com",
  "client_id": "114164362564300994029",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calendario%40sal-o-com-agendamento-nxfk.iam.gserviceaccount.com"
};

const timeZoneOffset = '-03:00';

const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
  });

const calendar = google.calendar('v3');

const mysql = require("mysql");
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const MYSQL_DB = process.env.MYSQL_DB;


app.post("/teste",function (request,response){

  let intentName = request.body.queryResult.intent.displayName;

  if (intentName === "agendamento"){

    let nome = request.body.queryResult.parameters['nome-completo'];
    let fone = request.body.queryResult.parameters['telefone'];

    let sql_query = "insert into clientes values ('"+nome+"','"+fone+"')";

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

function criarEventoCalendario(dateTimeStart, dateTimeEnd, servico,tipo,cliente) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requisição conflita com outros agendamentos'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: profissional +'-'+cliente+'-', description: '['+cliente+']['+profissional+']',
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}


function formatData(date) {
  var nomeMes = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
  ];

  var dia = date.getDate();
  var mesIndex = date.getMonth();
  var ano = date.getFullYear();

  return dia + ' ' + nomeMes[mesIndex] + ' ' + ano;
}






                                
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});