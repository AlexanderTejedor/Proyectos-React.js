import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './Components/Square'
import { turns } from './constants'
import { checkWinner, checkEndGame } from './logics/board.js'
import { WinnerModal } from './Components/WinnerModal.jsx'
import './App.css'

function App() {
  /*Tablero*/
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(turns.x)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              > 
              {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square
          isSelected = {turn === turns.x} 
        >
          {turns.x}
        </Square>
        <Square 
          isSelected = {turn === turns.o} 
        >
          {turns.o}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
