import * as actionsTypes from "./actionTypes";

const saveResult = (payloads) => {
	// Do data transformation work here.
	return { type: actionsTypes.STORE_RESULT, result: payloads };
};

export const storeResult = (payloads) => {
	return (dispatch, getState) => {
		setTimeout(() => {
			const oldCounter = getState().ctr.counter;
			console.log(oldCounter);
			dispatch(saveResult(payloads));
		}, 2000);
	};
};

export const deleteResult = (payloads) => {
	return { type: actionsTypes.DELETE_RESULT, resultElId: payloads };
};
