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

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //Funções implementadas:
  const startGame = () => {
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
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
