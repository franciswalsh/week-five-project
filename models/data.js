const fs = require('fs');

const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let guessesArray = [];
let correctGuessesArray = [];
let correctWordArray = [];
let correctWord;
let inCorrectGuessCounter = 0;

function getRandomWord(){
  const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
  let randomIndex = Math.floor(Math.random() * (possibleWordsArray.length+1));
  return possibleWordsArray[randomIndex];
}

function convertWordToArrayOfCharacters(word){
  let newArray = [];
  for (let i = 0; i < word.length; i++){
    newArray.push(word.charAt(i));
  }
  return newArray;
}
function makeArrayOfEmptyCharactersSameLengthAsWord(word){
  let newArray = [];
  for (let i = 0; i < word.length; i++){
    newArray.push({guess: '*'});
  }
  return newArray;
}
function isUserGuessCorrect(req, guess){
  let wasGuessCorrect = false;

  // for (let i = 0; i < correctWordArray.length; i++)
  for (guessed in correctWordArray){
    if (guess === correctWordArray[guessed]){
      correctGuessesArray[guessed].guess = guess;
      wasGuessCorrect = true;
    }
  }
  if (!wasGuessCorrect){
    inCorrectGuessCounter+=1;
  }
  req.session.counter = inCorrectGuessCounter;
  console.log(wasGuessCorrect);
  console.log(inCorrectGuessCounter);
}


correctWord = getRandomWord();
correctGuessesArray = makeArrayOfEmptyCharactersSameLengthAsWord(correctWord);
correctWordArray = convertWordToArrayOfCharacters(correctWord);


module.exports = {
  possibleWordsArray: possibleWordsArray,
  guessesArray: guessesArray,
  correctWordArray: correctWordArray,
  correctWord: correctWord,
  correctGuessesArray: correctGuessesArray,
  isUserGuessCorrect: isUserGuessCorrect,
  inCorrectGuessCounter: inCorrectGuessCounter
}
