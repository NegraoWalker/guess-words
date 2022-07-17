import React from 'react'
import './Game.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
    return (
        <div className='game'>
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p className='guesses'>Você ainda tem <span>{guesses}</span> tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, index) =>
                    guessedLetters.includes(letter)
                        ? (<span className="letter" key={index}>{letter}</span>)
                        : (<span key={index} className="blankSquare"></span>)
                )}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form>
                    <input type="text" name='letter' maxLength='1' required />
                    <button>Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, index) => (
                    <span key={index}>{letter}, </span>
                ))}
            </div>
            {/* <h1>Game</h1>
            <button onClick={verifyLetter}>Jogando</button> */}
        </div>
    )
}

export default Game