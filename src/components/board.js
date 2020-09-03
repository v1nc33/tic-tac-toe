import React from "react";
import styles from "./board.module.css";
import Square from "./square";

const Board = (props) => {
  console.log(props.win);
  const renderSquare = (i) => {
    return (
      <Square
        win={props.win ? props.win.indexOf(i) >= 0 : null}
        onClick={() => props.onClick(i)}
        value={props.squares[i]}
        key={i}
      />
    );
  };

  const generateBoard = (size) => {
    let board = [];
    let row = [];
    let index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        row.push(renderSquare(index));
        index++;
      }
      board.push(
        <div className={styles.boardRow} key={index}>
          {row}
        </div>
      );
      row = [];
    }
    return board;
  };

  const board = generateBoard(3);

  return (
    <div>
      {board.map((square) => {
        return square;
      })}
    </div>
  );
};

export default Board;
