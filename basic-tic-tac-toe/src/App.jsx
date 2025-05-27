import { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerData = calculateWinner(board);
  const winner = winnerData?.player;

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? "Draw"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <>
      <div className="Navbar">
        <span className="title">Tic Tac Toe</span>
      </div>
      <div className="game-container">
        <div className="board" role="grid">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`square ${
                winnerData?.line.includes(index) ? "highlight" : ""
              }`}
              onClick={() => handleClick(index)}
              aria-label={`Square ${index + 1}, ${cell || "empty"}`}
              tabIndex={0}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="status" aria-live="polite">
          {status}
        </div>
        <button className="restart-button" onClick={resetGame}>
          Restart
        </button>
      </div>
    </>
  );
};

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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;
