import React from 'react';
import Button from '../Button/Button';

import './ButtonsBox.css';

function ButtonsBox() {
  const btnValues = [
    ['C', '⌫', '%', '÷'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '+'],
    [1, 2, 3, '-'],
    [0, '.', '='],
  ];

  function addClasses(symbol) {
    if (
      symbol === 'C' ||
      symbol === '⌫' ||
      symbol === '%' ||
      symbol === '÷' ||
      symbol === 'X' ||
      symbol === '+' ||
      symbol === '-'
    ) {
      return 'button highlight';
    }

    if (symbol === '=') {
      return 'button hightlight_equal span-2';
    } else {
      return 'button';
    }
  }

  function clicked(value) {
    console.log(value, 'clicked');
  }

  return (
    <div className="buttons_box">
      {btnValues.flat().map((btn, i) => {
        return (
          <Button
            symbol={btn}
            span={btn === '=' ? 'button span-2' : 'button'}
            key={i}
            onClick={() => clicked(btn)}
            className={addClasses(btn)}
          />
        );
      })}
    </div>
  );
}

export default ButtonsBox;
