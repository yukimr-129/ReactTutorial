import { useState } from 'react';
import './App.css';
import Board from './components/Board';

const Game = () => {
  const [ history, setHistory ] = useState([Array(9).fill(null)])
  const [ historyXIsNext, setHistoryXIsNext ] = useState(true)
  const [ stepNumber, setStepNumber ] = useState(0)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }  
    }

    return null;
  }


  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const onClick = (i) => {
    const sliceHistory = history.slice(0, stepNumber + 1)
    const squares = [...current]


    if (winner || squares[i]) {
        return;
    }

    squares[i] = historyXIsNext ? 'X' : 'O'

    setHistory([...sliceHistory, squares])
    setHistoryXIsNext(!historyXIsNext)
    setStepNumber(sliceHistory.length)

  }

  const switchingStatus = (statusCurrent) => {
    const winner = calculateWinner(statusCurrent)
    let status

    if(winner) {
        status = `Winner: ${winner}`
    }else {
        status = `Next player: ${historyXIsNext ? 'X' : 'O'}`
    }

    return status
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setHistoryXIsNext(step % 2 === 0)
  }

  const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start'

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board history={current} onClick={onClick}/>
      </div>
      <div className="game-info">
        <div>{switchingStatus(current)}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
