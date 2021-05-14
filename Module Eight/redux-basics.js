const redux = require("redux");
const createStore = redux.createStore;
const initialState = { counter: 0 };
const store = createStore((state = initialState, { type, value }) => {
	if (type === "INC_COUNTER") {
		return { ...state, counter: state.counter + 1 };
	}
	if (type === "ADD_COUNTER") {
		return { ...state, counter: state.counter + value };
	}
	return state;
});

console.log(store.getState());
store.dispatch({ type: "INC_COUNTER" });
console.log(store.getState());
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 5 });
console.log(store.getState());
