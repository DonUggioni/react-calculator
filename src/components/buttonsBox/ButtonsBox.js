import React, { useCallback, useContext, useEffect } from 'react';
import Button from '../Button/Button';
import { CalcContext } from '../../store/calculator-context';

import './ButtonsBox.css';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operations = ['+', '-', '*', '/'];

function ButtonsBox() {
  const ctx = useContext(CalcContext);

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

  // Keyboard functionality
  const handleKeyPress = useCallback(
    (event) => {
      if (numbers.includes(event.key) && ctx.calc.num.toString().length < 16) {
        ctx.setCalc({
          ...ctx.calc,
          num:
            ctx.calc.num === 0 && event.key === '0'
              ? '0'
              : ctx.calc.num % 1 === 0
              ? Number(ctx.calc.num + event.key)
              : ctx.calc.num + event.key,
          res: !ctx.calc.symbol ? 0 : ctx.calc.res,
        });
      }

      if (operations.includes(event.key)) {
        ctx.setCalc({
          ...ctx.calc,
          symbol: event.key === '*' ? 'X' : event.key === '/' ? '÷' : event.key,
          num: '0',
          res: !ctx.calc.res && ctx.calc.num ? ctx.calc.num : ctx.calc.res,
        });
      }

      if (event.key === 'Escape') {
        resetClickHandler();
      }

      if (event.key === 'Enter') {
        equalsClickHandler();
      }

      if (event.key === 'Backspace') {
        deleteLastClickHandler();
      }

      if (event.key === '.') {
        decimalClickHandler();
      }

      if (event.key === '%') {
        percentClickHandler();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ctx]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  function numClickHandler(e) {
    const value = e.target.innerHTML;

    if (ctx.calc.num.toString().length < 16) {
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

  function deleteLastClickHandler() {
    ctx.setCalc({
      ...ctx.calc,
      num:
        ctx.calc.num.toString().length === 0
          ? '0'
          : ctx.calc.num.toString().slice(0, -1),
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
                ? deleteLastClickHandler
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
