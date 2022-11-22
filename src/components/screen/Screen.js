import React, { useContext } from 'react';
import { CalcContext } from '../../store/calculator-context';

import './Screen.css';

function Screen() {
  const ctx = useContext(CalcContext);
  return (
    <div className="screen">
      <span className="calc_history">
        {!ctx.calc.res ? 0 : ctx.calc.res.toLocaleString() + ctx.calc.symbol}
      </span>
      <span className="calc">
        {ctx.calc.num
          ? ctx.calc.num.toLocaleString()
          : ctx.calc.res.toLocaleString()}
      </span>
    </div>
  );
}

export default Screen;
