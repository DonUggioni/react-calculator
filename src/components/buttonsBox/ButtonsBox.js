import React, { useContext } from 'react';
import Button from '../Button/Button';
import { CalcContext } from '../../store/calculator-context';

import './ButtonsBox.css';

function ButtonsBox() {
  const calcCtx = useContext(CalcContext);

  function numberInputHandler(n) {
    calcCtx.setNum([...calcCtx.numbers, n]);

    if (n === '+' || n === '-' || n === '÷' || n === 'X') {
      calcCtx.setCalcHistory([
        ...calcCtx.calcHistory,
        calcCtx.numbers.join('') + n,
      ]);
      calcCtx.setSymbol(n);
      calcCtx.setNum([]);
    }
  }

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
      return 'button highlight_equal span-2';
    } else {
      return 'button';
    }
  }

  return (
    <div className="buttons_box">
      {btnValues.flat().map((btn, i) => {
        return (
          <Button
            symbol={btn}
            span={btn === '=' ? 'button span-2' : 'button'}
            key={i}
            onClick={() => numberInputHandler(btn)}
            className={addClasses(btn)}
          />
        );
      })}
    </div>
  );
}

export default ButtonsBox;
