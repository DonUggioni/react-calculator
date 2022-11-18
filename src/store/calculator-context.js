import { createContext, useState } from 'react';

export const CalcContext = createContext({});

export function CalculatorProvider(props) {
  const [num, setNum] = useState([]);
  const [calcHistory, setCalcHistory] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [calc, setCalc] = useState(null);
  console.log(num, symbol);

  const values = {
    numbers: num,
    total: calc,
    calcHistory: calcHistory,
    setNum,
    setCalcHistory,
    setSymbol,
    symbol,
  };

  return (
    <CalcContext.Provider value={values}>{props.children}</CalcContext.Provider>
  );
}

export default CalculatorProvider;
