import * as actionsTypes from "./actionTypes";

export const increment = (payloads = null) => {
	return { type: actionsTypes.INCREMENT };
};

export const decrement = (payloads = null) => {
	return { type: actionsTypes.DECREMENT };
};

export const add = (payloads) => {
	return { type: actionsTypes.ADD, val: payloads };
};

export const subtract = (payloads) => {
	return { type: actionsTypes.SUBTRACT, val: payloads };
};
