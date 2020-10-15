import React from 'react';
import './App.css';
import {useRecoilState, useRecoilValue} from "recoil";
import {negativeRandomNumber, randomNumber} from "./model";

function App() {
	
  const rnd = useRecoilValue(randomNumber);
  const negRnd = useRecoilState(negativeRandomNumber);
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>This state is changed from outside of Recoil Root</h2>
	    <h1>{rnd}</h1>
	    <h1>{negRnd}</h1>
      </header>
    </div>
  );
}

export default App;
