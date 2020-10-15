import {connectedAtom, connectedSelector} from "./ConnectedStore";

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
