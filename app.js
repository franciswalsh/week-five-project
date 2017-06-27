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
  } else {
    res.send("we are communicating");
  }

});
app.get('/theGame/', function(req, res){
  res.render('theGame', {correctGuessesArray: data.correctGuessesArray, guessesArray: data.guessesArray});
});
app.post('/theGame/', function(req, res){
  let userGuess = req.body.userGuess;

  req.checkBody("userGuess", "You must enter a guess").notEmpty();
  var errors = req.validationErrors();

  if(errors){
    res.send(errors[0].msg);
  } else {
    if (userGuess.length > 1){
      res.send("your entry must be one letter");
    } else {
      data.guessesArray.push(userGuess);
      data.isUserGuessCorrect(req, userGuess);
      res.redirect('/theGame/');
    }
  }

});
console.log("this is the correct word: " + data.correctWord);
console.log("this is guessesArray: " + data.guessesArray);
console.log(data.correctGuessesArray);
app.listen(3000, function () {
  console.log('Successfully started express application!');
});
