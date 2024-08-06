import { useState } from 'react'
import './App.css'

/*Turnos*/
const turns = {
  x: 'x',
  o: 'o',
}
/*Tablero del cuadrado - Componente*/
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
const winnerCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
]

function App() {
  /*Tablero*/
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(turns.x)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    for (const combo of winnerCombos){
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

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
      setWinner(newWinner)
    }
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              > 
              {board[index]}
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
      {
        winner !== null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false 
                    ? 'Empate' 
                    : `Gano:`
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>
          </section>
        )
  }
    </main>
  )
}

export default App
