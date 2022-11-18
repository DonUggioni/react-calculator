import React, { useContext } from 'react';
import { CalcContext } from '../../store/calculator-context';

import './Screen.css';

function Screen() {
  const calcCtx = useContext(CalcContext);
  return (
    <div className="screen">
      <span className="calc_history">
        {calcCtx.calcHistory.length === 0 ? 0 : calcCtx.numbers}
      </span>
      <span className="calc">
        {calcCtx.numbers.length === 0 ? 0 : calcCtx.numbers}
      </span>
    </div>
  );
}

export default Screen;
