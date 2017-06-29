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

app.use(express.static(__dirname));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');


app.get('/', function(req, res){

  req.session.numberOfGuessesLeft = 8;

  if(req.session){
    res.redirect('/theGame/');
  } else {
    res.send("we are communicating");
  }

});
app.get('/theGame/', function(req, res){

  let bullshitArray = [req.session.numberOfGuessesLeft];
  console.log(req.session.numberOfGuessesLeft);
  res.render('theGame', {correctGuessesArray: data.correctGuessesArray, guessesArray: data.guessesArray, bullshitArray: bullshitArray});
});
app.post('/theGame/', function(req, res){
  console.log(data.correctWord);
  let userGuess = req.body.userGuess;
  req.checkBody("userGuess", "You must enter a guess").notEmpty();
  var errors = req.validationErrors();

  if(errors){
    // res.send(errors[0].msg);
    res.redirect('/blankEntry/');
  } else {
    if (userGuess.length > 1){
      // res.send("your entry must be one letter");
      res.redirect('/tooManyCharacters/');
    } else if (data.testingForDuplicateInput(userGuess)){
      res.redirect('/duplicateEntry');
    } else {
        data.guessesArray.push(userGuess);
        data.isUserGuessCorrect(req, userGuess);
        let correctGuesses = req.session.numberOfCorrectGuesses;
        let correctArray = data.correctGuessesArray;
        let winner = data.didUserWin(correctArray);
        let guessesLeft = req.session.numberOfGuessesLeft;
        bullshitArray = [req.session.numberOfGuessesLeft]
        if (guessesLeft <= 0){
          res.redirect('/youLose/');
        } else if (winner){
          res.redirect('/youWin/');
          console.log(data.correctWordWrapper);
        } else {
          res.redirect('/theGame/');
        }
      // res.redirect('/theGame/');
    }
  }
});
app.get('/youLose/', function(req, res){
  res.render('youLose', {correctWordWrapper: data.correctWordWrapper});
});
app.get('/youWin/', function(req, res){
  res.render('youWin', {correctWordWrapper: data.correctWordWrapper});
});
app.get('/soreLoser/', function(req, res){
  res.send('something went wrong');
});
app.post('/soreLoser/', function(req, res){
  res.send("I guess you're a sore loser");
});
app.get('/playAgain/', function(req, res){
  res.send('something went wrong');
});
app.post('/playAgain/', function(req, res){
  console.log(req.session);
  res.redirect('/');
});
app.get('/tooManyCharacters/', function(req, res){
  res.render('moreThanOneCharacter');
});
app.post('/tooManyCharacters/', function(req, res){
  res.redirect('/theGame/');
});
app.get('/duplicateEntry/', function(req, res){
  res.render('duplicateEntry');
});
app.post('/duplicateEntry/', function(req, res){
  res.redirect('/theGame/');
});
app.get('/blankEntry/', function(req, res){
  res.render('blankEntry');
});
app.post('/blankEntry/', function(req, res){
  res.redirect('/theGame/');
});
app.listen(3000, function () {
  console.log('Successfully started express application!');
});
