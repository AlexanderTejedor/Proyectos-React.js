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

function App() {
  /*Tablero*/
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(turns.x)

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
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
    </main>
  )
}

export default App
