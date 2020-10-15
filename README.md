This is an example on how to change Recoil State from outside components. Currently it will only work with a single RecoilRoot, but it could be adapted to multiple in the future.

There are only two things to consider to integrate this solution into your project. 

## Changes to the normal Recoil way 

1. Use <RecoilRootWithStore> instead of <RecoilRoot>. 
2. Use connectedAtom and connectedSelector instead of atom and selector.
3. Now you can change your state by using a function called `updateConnectedValue` from anywhere you like. Which accepts the Atom/Selector you want to change and its new value.

## How does it work

### ConnectedStore 

The Connected Store is essentially a Dictionary. That maps Atoms/Selector's keys to a setter function (SetterOrUpdater<T> in Recoil). This way it can update any Atom passed to it, after it has obtained their setters (this is done in RecoilRootWithStore)
  
To add new Atoms/Selectors to the store we use the functions `connectedAtom` and `connectedSelector` which simply call Recoil's `atom` and `selector` but additionally adds them to the store. 

The ´updateConnectedValue´ function simply uses a singleton instance of the connectedStore to call its update funciton. Which in turn can retrieve the key of the passed atom and call the stored selector. 

```
class ConnectedStore
export function connectedSelector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>
export function connectedAtom<T>(options: AtomOptions<T>): RecoilState<T>
export function updateConnectedValue<T>(state:RecoilState<T>,val:T)
```

### RecoilRootWithStore

In order for the ConnectedStore to be able to modify RecoilState (that is after all connected to a context, and hence the React tree) it needs to obtain setters.
This happens in RecoilRootWithStore, which is simply a RecoilRoot but adds an additional small component that has only one function, to call the ConnectedStore and give it access to the Context. 

```
const RecoilStore:React.FC = (props)=>{
	connectedStore.updateInContext(this);
	return null;
}
const RecoilRootWithStore:React.FC = (props) => {
	return (
		<RecoilRoot>
			<RecoilStore/>
			{props.children}
		</RecoilRoot>);
}
export default RecoilRootWithStore;
```

updateInContext uses the reference to the RecoilStore to call `useSetRecoilState` and obtain the getters. This needs to be done only once new Atoms are created. 
(This is technically using hooks outside of a class, but it is only the code that is sitting outside, "this" refers to the React Component not the ConnectedStore, so the hooks are initalized in the correct context and nobody gets hurt.)

@Todo: This will probably create some Problems with AtomFamilies, but nothing that can't be worked around. 

## How to Test

This is a CreateReactApp 
so 
run ´npm install´ and then ´npm start´
