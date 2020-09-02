import React, { useState } from "react";
import styles from "./game.module.css";
import Board from "./board";

const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board />
      </div>
      <div className={styles.gameInfo}>
        <div>{/*status*/}</div>
        <ol>{/* todo */}</ol>
      </div>
    </div>
  );
};

export default Game;
