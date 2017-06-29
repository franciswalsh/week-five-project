const fs = require('fs');

const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let guessesArray = [];
let correctGuessesArray = [];
let correctWordArray = [];
let correctWord;
let numberOfGuessesLeft = 8;


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
  for (let i = 0; i < correctWordArray.length; i++)
  for (guessed in correctWordArray){
    if (guess === correctWordArray[guessed]){
      correctGuessesArray[guessed].guess = guess;
      wasGuessCorrect = true;
    }
  }
  if (!wasGuessCorrect){
    numberOfGuessesLeft-=1;
  }
  req.session.numberOfGuessesLeft = numberOfGuessesLeft;
  return;
}
function didUserWin(array){
  let counter = 0;
  for (let i in array){
    if (array[i].guess === '*'){
      counter++;
    }
  }
  if (counter === 0){
    return true;
  }
  else {
    return false;
  }
}

function testingForDuplicateInput(userGuess){
  let duplicate = false
  for (let i in guessesArray){
    if (guessesArray[i] === userGuess){
      duplicate = true;
    }
  }
  return duplicate;
}



correctWord = getRandomWord();
let correctWordWrapper = [correctWord];
correctGuessesArray = makeArrayOfEmptyCharactersSameLengthAsWord(correctWord);
correctWordArray = convertWordToArrayOfCharacters(correctWord);

// let bullshitArray = [req.session.numberOfGuessesLeft]

module.exports = {
  possibleWordsArray: possibleWordsArray,
  guessesArray: guessesArray,
  correctWordArray: correctWordArray,
  correctWord: correctWord,
  correctGuessesArray: correctGuessesArray,
  isUserGuessCorrect: isUserGuessCorrect,
  numberOfGuessesLeft: numberOfGuessesLeft,
  didUserWin: didUserWin,
  getRandomWord: getRandomWord,
  makeArrayOfEmptyCharactersSameLengthAsWord: makeArrayOfEmptyCharactersSameLengthAsWord,
  convertWordToArrayOfCharacters: convertWordToArrayOfCharacters,
  testingForDuplicateInput: testingForDuplicateInput,
  correctWordWrapper: correctWordWrapper
  // bullshitArray: bullshitArray
}
