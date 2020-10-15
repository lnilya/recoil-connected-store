import {
	atom,
	AtomOptions,
	ReadWriteSelectorOptions,
	RecoilState,
	selector,
	SetterOrUpdater,
	useSetRecoilState
} from "recoil";


/**
 * Store that contains all atoms and selectors created by using connectedSelector and connectedAtom
 * This is a global store, so currently it will not work with multiple RecoilRoots.
 * The only thing that needs to be done in order for the Store to become intialized is a component within a RecoilRoot
 * that calls updateInContext and passes itself as the context.
 * @see RecoilRootWithStore
 */
class ConnectedStore{
	private store:{[key:string]: { setter:SetterOrUpdater<any>|null, state:RecoilState<any> }};
	constructor() {
		this.store = {};
	}
	
	addRecoilState<T>(rs:RecoilState<T>):RecoilState<T>{
		this.store[rs.key] = {state:rs, setter:null};
		return rs;
	}
	
	updateRecoilState<T>(a:RecoilState<T>, newVal:T){
		if(!this.store[a.key])
			throw new Error('Attempting to update a connected value that was not created via connectedAtom');
		else {
			if(this.store[a.key].setter){
				// @ts-ignore
				this.store[a.key].setter(newVal);
			}else{
				throw new Error('Attempting to update a connected value, that has no setter attached yet. Using RecoilRootWithStore?');
			}
		}
	}
	public updateInContext(context:any){
		var hook = useSetRecoilState;
		const update = (st:{ setter:SetterOrUpdater<any>|null, state:RecoilState<any> })=>{
			st.setter = hook(st.state);
		};
		for (let storeKey in this.store) {
			update.apply(context,[this.store[storeKey]]);
		}
	}
}

export const connectedStore:ConnectedStore = new ConnectedStore();

/**
 * Central function for updating a ConnectedState Atom or Selector
 * @param state An atom or selector created via connectedAtom or connectedSelector
 * @param val The new value of the state.
 * @see connectedAtom
 * @see connectedSelector
 */
export function updateConnectedValue<T>(state:RecoilState<T>,val:T){
	connectedStore.updateRecoilState(state,val);
}

/**
 * Function to create ConnectedState Atoms instead of normal Recoil Atoms.
 * This makes an atom acessible from outside the react component tree.
 * use updateConnectedValue to access this funcitonality.
 * @param options
 * @see atom
 */
export function connectedAtom<T>(options: AtomOptions<T>): RecoilState<T>{
	return connectedStore.addRecoilState(atom<T>(options)); //store the atom for future reference
}
/**
 * Function to create ConnectedState Selectors instead of normal Recoil Selectors.
 * This makes a Selector acessible from outside the react component tree.
 * use updateConnectedValue to access this funcitonality in the cases where you need to update a selector
 * @param options
 * @see selector
 */
export function connectedSelector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>{
	return connectedStore.addRecoilState(selector<T>(options) as RecoilState<T>); //store the atom for future reference
}
