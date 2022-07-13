import React from 'react'
import './GameOver.css'

const GameOVer = ({ retry }) => {
    return (
        <div>
            <h1>GameOver</h1>
            <button onClick={retry}>Finalizar jogo</button>
        </div>
    )
}

export default GameOVer