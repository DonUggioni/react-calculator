import React from 'react';
import Screen from '../screen/Screen';
import ButtonsBox from '../buttonsBox/ButtonsBox';

import './Wrapper.css';

function Wrapper() {
  return (
    <main className="wrapper">
      <Screen />
      <ButtonsBox />
    </main>
  );
}

export default Wrapper;
