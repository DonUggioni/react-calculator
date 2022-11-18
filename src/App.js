import Wrapper from './components/wrapper/Wrapper';

import { CalculatorProvider } from './store/calculator-context';

function App() {
  return (
    <main className="App">
      <CalculatorProvider>
        <Wrapper />
      </CalculatorProvider>
    </main>
  );
}

export default App;
