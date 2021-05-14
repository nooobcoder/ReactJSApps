import * as actions from "../Actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: "/",
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, idToken, userId) => {
	return updateObject(state, {
		token: idToken,
		userId: userId,
		error: null,
		loading: false,
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	});
};

export const authLogoutUser = (state, action) => {
	return updateObject(...state, {
		token: null,
		userId: null,
	});
};

const setAuthRedirectPath = (state, action) => {
	// console.log(action);
	return { ...state, authRedirectPath: action.path };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.AUTH_START:
			return authStart(state, action);
		case actions.AUTH_SUCCESS:
			// console.log("REDUCER CASE", action);
			return authSuccess(state, action.idToken, action.localId);
		case actions.AUTH_FAIL:
			return authFail(state, action);
		case actions.AUTH_LOGOUT:
			return authLogoutUser(state, action);
		case actions.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
