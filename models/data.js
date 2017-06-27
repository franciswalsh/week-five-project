const fs = require('fs');

let guessesArray = [];
let correctGuessesArray = [];
let correctWordArray = [];
let correctWord;
const possibleWordsArray = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

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
  for (let i = 0; i < correctWordArray.length; i++){
    if (guess === correctWordArray[i]){
      correctGuessesArray[i].guess = guess;
    }
  }
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
  isUserGuessCorrect: isUserGuessCorrect
}
