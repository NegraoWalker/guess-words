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

const guessesQty = 3


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


  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()//Normalizando as letras todas pra minusculas
    //Fazendo uma checagem se as letras estão sendo utilizadas:
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }
    //Adicionando uma letra como certa ou errada:
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, //Adicionando elementos no array
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }


  useEffect(() => { //É usado para monitoração de algum dado de escolha
    if (guesses <= 0) { //Verificação se o número de tentativas chegou a zero para mudar o estágio do jogo

      clearLetterStates()
      setGameStage(stages[2].name)
    }

  }, [guesses])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />} {/*Se o estágio do game for o start eu exibo meu component StartScreen*/}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
