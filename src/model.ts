
import {connectedAtom, connectedSelector, updateConnectedValue} from "./ConnectedStore";

//An example Atom which stores a random number
export const randomNumber = connectedAtom<number>({
	key:'random_number',
	default: 0
});

//An example selector which makes the randomNumber Atom negative, and can also be set directly
export const negativeRandomNumber = connectedSelector<number>({
	key: 'neg_random_number',
	get: ({get}) => get(randomNumber) * -1,
	set: ({set}, newValue) => {
		set(randomNumber, newValue);
	}
});





//For Demo, we are updated a recoil value from outside of React.

//Updating the Atom directly...
setInterval(()=>{
	updateConnectedValue(randomNumber,Math.random());
},1000);

//...or alternatively updating a Selector that works on this Atom
// setInterval(()=>{
// 	updateConnectedValue(negativeRandomNumber,Math.random());
// },1000);

