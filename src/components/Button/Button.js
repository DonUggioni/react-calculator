import React from 'react';

import './Button.css';

function Button(props) {
  const classes = `button ${props.span}`;

  return (
    <button className={props.className} onClick={props.onClick}>
      {props.symbol}
    </button>
  );
}

export default Button;
