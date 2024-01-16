import Square from "./Square";
import { useState } from 'react';

export default function Board() {
    const m=15, n=20;
    const numConsecutiveToWin=5;
    const [squares, setSquares] = useState(Array(m*n).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [latestPos, setLatestPos] = useState(null);

    function reset(){
        setXIsNext(true);
        setLatestPos(null);
        setSquares(Array(m*n).fill(null));
    }

    const winner = calculateWinner();

    function handleClick(i) {
      if (squares[i] || winner) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setLatestPos(i);
    }
    function posToRowCol(pos){
        return [parseInt(pos/n), pos %n];
    }
    function rowColToPos(row, col){
        return row*n+col;
    }
    function calculateWinner(){
        const [row, col] = posToRowCol(latestPos);
        const latestSymbol = xIsNext? "O": "X";
        console.log(`Current pos is ${latestPos}, row is ${row} col is ${col}, latest symbol is ${latestSymbol}`);

        // check vertical
        var upper=row, lower=row;
        console.log(`at first, upper=${upper}, lower=${lower}`);
        while ((squares[rowColToPos(upper, col)]===latestSymbol)) {
            upper--;
            if (upper<0){break;}
        }
        while ((squares[rowColToPos(lower, col)]===latestSymbol)) {
            lower++;
            if (lower>=m){break;}
        }
        console.log(`after the while loop, upper=${upper}, lower=${lower}`);
        if (lower - upper - 1>=numConsecutiveToWin){return latestSymbol;}

        // check horizontal
        var left=col, right=col;
        while ((squares[rowColToPos(row, left)]===latestSymbol)) {
            left--;
            if (left<0){break;}
        }
        while ((squares[rowColToPos(row, right)]===latestSymbol)) {
            right++;
            if (right>=n){break;}
        }
        if (right - left - 1>=numConsecutiveToWin){return latestSymbol;}

        // checking up right diagonal        
        left=col;
        right=col;
        while ((squares[rowColToPos(row-col+left, left)]===latestSymbol)) {
            left--;
            if ((left<0)|(row-col+left)>=m){break;}
        }
        while ((squares[rowColToPos(row-col+right, right)]===latestSymbol)) {
            right++;
            if ((right>=n)|(row-col+right<=0)){break;}
        }
        if (right - left - 1>=numConsecutiveToWin){return latestSymbol;}
        
        // checking up left diagonal        
        left=col;
        right=col;
        while ((squares[rowColToPos(row+col-left, left)]===latestSymbol)) {
            left--;
            if ((left<0)|(row+col-left<=0)){break;}
        }
        while ((squares[rowColToPos(row+col-right, right)]===latestSymbol)) {
            right++;
            if ((right>=n)|(row+col-right>=m)){break;}
        }
        if (right - left - 1>=numConsecutiveToWin){return latestSymbol;}
        return null;
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const board = []
    for (let row = 0; row < m; row ++) {
        let board_row = [];
        for (let col = 0; col < n; col ++) {
            board_row.push(<Square value={squares[row*n + col]} onSquareClick={()=>handleClick(row*n + col)}/>)
        }
        board.push(<div className="board-row">{board_row}</div>);
    }
    return (
      <>
        <div className="left-text">
            <h3>Caro chess</h3>
            <p>Rule: each player alternates X and O, whoever gets to 5 in a row, or column or diagonal first wins.</p>
            <button className="play-button" onClick={reset}>PLAY</button>
            <p className="status">{status}</p>
        </div>
        <div className="board">{board}</div>
      </>
    );
  }
    
