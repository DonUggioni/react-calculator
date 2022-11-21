import { createContext, useState } from 'react';

export const CalcContext = createContext({});

export function CalculatorProvider(props) {
  const [calc, setCalc] = useState({
    symbol: '',
    num: 0,
    res: 0,
  });

  const values = { calc, setCalc };

  return (
    <CalcContext.Provider value={values}>{props.children}</CalcContext.Provider>
  );
}

export default CalculatorProvider;
