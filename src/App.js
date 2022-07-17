// CSS da aplicação:
import './App.css';
// Hooks da aplicação:
import { useCallback, useEffect, useState } from 'react';
// Dados da aplicação:
import { wordsList } from './data/words'
// Components da aplicação:
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//Estágios do nosso Jogo:
const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]



function App() {
  //Variáveis e funções de estado:
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)


  //Funções implementadas:
  const pickWordAndCategory = () => {
    //Recebendo uma categoria aleatória dos nossos dados:
    const categories = Object.keys(words) //As categorias são as chaves do objeto do arquivo de dados words.js
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] //Recebendo uma categoria dos dados aleatória
    console.log(category)
    //Recebendo uma palavra aleatória da nossa categoria recebida, também de forma aleatória:
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return { word, category } //Retornando a palavra e categoria aleatória após o user clicar no botão
  }


  const startGame = () => {
    const { word, category } = pickWordAndCategory() //Recebendo a palavra e a categoria aleatória de forma desestruturada pela função
    console.log(word, category)

    let wordLetters = word.split('')
    wordLetters = wordLetters.map((letters) => letters.toLowerCase()) //Transformando todas as letras da palavra para minúsculo. JavaScript é case sensitive e isso pode bugar o input do user
    console.log(wordLetters)

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }


  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />} {/*Se o estágio do game for o start eu exibo meu component StartScreen*/}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
