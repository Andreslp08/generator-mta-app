import React, { createContext, Reducer, useContext, useReducer } from "react";

import * as _ from "lodash";

export interface Action {
	path: string;
	value: any;
	type: string;
}

export interface State {
	// this is a test property, put here your state
	devNameTest: string;
}

export interface stateHandler {
	dispatch?(action: Action): void;
	state: State;
}

const initialContext: State = {
	// set your default state here
	devNameTest: "Developer",
};

const stateContext = createContext<stateHandler>({ state: initialContext });

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "CHANGE_STATE":
			const newState = _.set({ ...state }, action.path, action.value);
			return { ...newState };
		default:
			return state;
	}
};

export const useAppState = () => {
	const { state, dispatch } = useContext(stateContext);
	return {
		appState: state,
		appStateDispatch: dispatch,
	};
};

export const StateProvider: React.FC<any> = ({ children }) => {
	const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialContext);

	return <stateContext.Provider value={{ state, dispatch }}>{children}</stateContext.Provider>;
};
