import React, { useState } from "react";

import styles from "./square.module.css";

const Square = (props) => {
  const [value, setValue] = useState(null);
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
