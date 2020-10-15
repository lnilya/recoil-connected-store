import React from 'react';
import {RecoilRoot} from "recoil";
import {connectedStore} from "./ConnectedStore";

const RecoilStore:React.FC = (props)=>{
	// @ts-ignore
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