import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecoilRootWithStore from "./RecoilRootWithStore";
import {updateConnectedValue} from "./ConnectedStore";
import {randomNumber} from "./model";

ReactDOM.render(
  <React.StrictMode>
	  <RecoilRootWithStore>
            <App />
	  </RecoilRootWithStore>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//For Demo, we are updated a recoil value from outside of React.

//Updating the Atom directly...
setInterval(()=>{
	updateConnectedValue(randomNumber,Math.random());
},1000);

//...or alternatively updating a Selector that works on this Atom
// setInterval(()=>{
// 	updateConnectedValue(negativeRandomNumber,Math.random());
// },1000);

