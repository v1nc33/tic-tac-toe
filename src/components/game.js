import React, { useState } from "react";
import styles from "./game.module.css";
import Board from "./board";

const Game = () => {
  let winningSq;
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [toggleDesc, setToggleDesc] = useState(true);

  const showLocation = (field) => {
    const coordinates = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        coordinates.push([i + 1, j + 1]);
      }
    }
    return coordinates[field];
  };

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        console.log(lines[i]);
        winningSq = lines[i];
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    const location = showLocation(i);
    setHistory(gameHistory.concat([{ squares: squares, location: location }]));
    setXIsNext(!xIsNext);
    setStepNumber(gameHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
    console.log(winningSq);
    //console.log(winningSquares);
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        <div
          style={{
            width: "250px",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ fontWeight: move === stepNumber ? "600" : "300" }}
            className={styles.button}
            onClick={() => {
              jumpTo(move);
            }}
          >
            {desc}
          </button>
          <p>
            {history[move].location
              ? "Col: " +
                history[move].location[1] +
                " " +
                "Row: " +
                history[move].location[0]
              : null}
          </p>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board
          onClick={(i) => handleClick(i)}
          squares={current.squares}
          win={winningSq}
        />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <button
          className={styles.button}
          onClick={() => setToggleDesc(!toggleDesc)}
        >
          {toggleDesc ? "Desc" : "Asce"}
        </button>
        <ol>{toggleDesc ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};

export default Game;
