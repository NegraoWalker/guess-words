import React from 'react'
import './Game.css'

const Game = ({ verifyLetter }) => {
    return (
        <div className='game'>
            <p className="points">
                <span>Pontuação: 0</span>
            </p>
            {/* <h1>Game</h1>
            <button onClick={verifyLetter}>Jogando</button> */}
        </div>
    )
}

export default Game