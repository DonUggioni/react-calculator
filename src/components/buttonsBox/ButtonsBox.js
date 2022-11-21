import React, { useContext } from 'react';
import Button from '../Button/Button';
import { CalcContext } from '../../store/calculator-context';

import './ButtonsBox.css';

function ButtonsBox() {
  const ctx = useContext(CalcContext);
  console.log(ctx.calc);
  console.log(ctx.calc.res);
  console.log(ctx.calc.num.toString().length);

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

  function numClickHandler(e) {
    const value = e.target.innerHTML;
    console.log(value);

    if (ctx.calc.num.toString().length + '' < 16) {
      ctx.setCalc({
        ...ctx.calc,
        num:
          ctx.calc.num === 0 && value === '0'
            ? '0'
            : ctx.calc.num % 1 === 0
            ? Number(ctx.calc.num + value)
            : ctx.calc.num + value,
        res: !ctx.calc.symbol ? 0 : ctx.calc.res,
      });
    }
  }

  function decimalClickHandler(e) {
    const value = e.target.innerHTML;

    ctx.setCalc({
      ...ctx.calc,
      num: !ctx.calc.num.toString().includes('.')
        ? ctx.calc.num + value
        : ctx.calc.num,
    });
  }

  function symbolClickHandler(e) {
    const value = e.target.innerHTML;

    ctx.setCalc({
      ...ctx.calc,
      symbol: value,
      res: !ctx.calc.res && ctx.calc.num ? ctx.calc.num : ctx.calc.res,
      num: 0,
    });
  }

  function equalsClickHandler() {
    if (ctx.calc.symbol && ctx.calc.num) {
      const math = (a, b, symbol) =>
        symbol === '+'
          ? a + b
          : symbol === '-'
          ? a - b
          : symbol === 'X'
          ? a * b
          : a / b;

      ctx.setCalc({
        ...ctx.calc,
        res:
          ctx.calc.num === 0 && ctx.calc.symbol === '÷'
            ? "Can't divide by 0"
            : math(Number(ctx.calc.res), Number(ctx.calc.num), ctx.calc.symbol),
        symbol: '',
        num: 0,
      });
    }
  }

  function percentClickHandler() {
    let num = ctx.calc.num ? parseFloat(ctx.calc.num) : 0;
    let res = ctx.calc.res ? parseFloat(ctx.calc.res) : 0;

    ctx.setCalc({
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      symbol: '',
    });
  }

  function clearLastClickHandler() {
    ctx.setCalc({
      num: ctx.calc.num.toString().slice(0, -1),
    });
  }

  function resetClickHandler() {
    ctx.setCalc({
      ...ctx.calc,
      symbol: '',
      num: 0,
      res: 0,
    });
  }

  return (
    <div className="buttons_box">
      {btnValues.flat().map((btn, i) => {
        return (
          <Button
            symbol={btn}
            key={i}
            onClick={
              btn === 'C'
                ? resetClickHandler
                : btn === '⌫'
                ? clearLastClickHandler
                : btn === '%'
                ? percentClickHandler
                : btn === '='
                ? equalsClickHandler
                : btn === '÷' || btn === 'X' || btn === '-' || btn === '+'
                ? symbolClickHandler
                : btn === '.'
                ? decimalClickHandler
                : numClickHandler
            }
            className={addClasses(btn)}
          />
        );
      })}
    </div>
  );
}

export default ButtonsBox;
