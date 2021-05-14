const redux = require("redux");
const createStore = redux.createStore;

const initialStore = { counter: 0 };

const rootReducer = (state = initialStore, { type, value }) => {
	if (type === "INC_COUNTER") {
		return { ...state, counter: state.counter + 1 };
	}
	if (type === "ADD_COUNTER") {
		return { ...state, counter: state.counter + value };
	}
	return state;
};

const store = createStore(rootReducer);

// CREATING SUBSCRIPTION (A SUBSCRIPTION SHOULD BE SET JUST AFTER CREATING STORE, SO THAT IT CAN REACT TO STATE CHANGED)
store.subscribe(() => {
	console.log("[SUBSCRIPTION] ", store.getState());
});

// console.log(store.getState());

store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
// console.log(store.getState());
