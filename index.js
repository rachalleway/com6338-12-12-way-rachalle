const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
guessLetter(letter) {
  let wordArray = this.word.split('')
  let displayArray = this.displayWord.split('')
  let correct = false
  for (var i = 0; i < wordArray.length; i++){
    if (wordArray[i] == letter){
      correct = true
      this.correctLetters.push(letter)
      displayArray[i ]= letter
    }else{

    }
  }
  if (correct === true){
    this.displayWord=displayArray.join('')
  }else{
    this.remainingGuesses--
    this.incorrectLetters.push(letter)
  }
}

  // implement the updateScreen function:
updateScreen() {
  document.getElementById("remaining-guesses").textContent = this.remainingGuesses
  document.getElementById("incorrect-letters").textContent = this.incorrectLetters
  document.getElementById("word-to-guess").textContent = this.displayWord
}

  // implement the isGameOver function:
isGameOver() {
  if (this.remainingGuesses <= 0 || this.word === this.displayWord){
    return true
  }else{
    return false
  }
}

  // implement the getWinOrLoss function:
getWinOrLoss() {
  if (this.word === this.displayWord && this.remainingGuesses > 0){
    return 'win'
  }else if (this.word !== this.displayWord && this.remainingGuesses <= 0){
    return 'loss'
  }else{
    return null
  }
}
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()