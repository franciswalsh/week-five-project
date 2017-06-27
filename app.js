const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const data = require('./models/data.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/', function(req, res){
  if(req.session){
    res.redirect('/theGame/');
    console.log(req.session);
  } else {
    res.send("we are communicating");
  }

});
app.get('/theGame/', function(req, res){
  res.render('theGame');
});
app.post('/theGame/', function(req, res){
  let userGuess = req.body.userGuess;
  data.guessesArray.push(userGuess);
  res.send(data.guessesArray);
});

console.log(data.correctWord);
console.log(data.correctWordArray);

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
