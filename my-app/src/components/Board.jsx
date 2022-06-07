import { useState } from "react";
import Square from "./Square";

const Board = () => {
    const [ number, setNumber] = useState(Array(9).fill(null))
    const [ xIsNext, setXIsNext] = useState(true)

    const handleClick = (i) => {
        const squares = [...number]

        if (calculateWinner(number) || number[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O'
        console.log(squares);

        setNumber([...squares])
        setXIsNext(!xIsNext)
    }

    function calculateWinner(squares) {
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
    

    const switchingStatus = () => {
        const winner = calculateWinner(number)
        let status

        if(winner) {
            status = `Winner: ${winner}`
        }else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`
        }

        return status
    }



    const renderSquare = (i) => {
        return <Square value={number[i]} onClickHandle={() => handleClick(i)}/>;
    }

    return (
        <div>
            <div className="status">{switchingStatus()}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );    
}

export default Board