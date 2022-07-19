import React from 'react'
import './GameOver.css'

const GameOVer = ({ retry, score }) => {
    return (
        <div>
            <h1>Fim de Jogo!!</h1>
            <h2>A sua pontuação foi: <span>{score}</span></h2>
            <button onClick={retry}>Finalizar jogo</button>
        </div>
    )
}

export default GameOVer