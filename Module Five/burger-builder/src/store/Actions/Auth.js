import axios from "axios";
import * as actions from "../Actions/actionTypes";

export const authStart = () => {
	return {
		type: actions.AUTH_START,
	};
};

export const authSuccess = (idToken, localId) => {
	return {
		type: actions.AUTH_SUCCESS,
		idToken: idToken,
		localId: localId,
	};
};

export const authFail = (error) => {
	return {
		type: actions.AUTH_FAIL,
		error: error,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout);
		}, expirationTime * 1000);
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actions.AUTH_LOGOUT,
	};
};

export const doAuthenticate = (email, password, method = "signUp") => {
	// method -> Mode for authentication, SIGNUP/SIGNIN
	// VALID OPTIONS: "signUp" or "signInWithPassword"
	// Check Firebase SDK API for more information: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyCynsTIBwi-UBgsjXbhJE57i-q7hc4Qj6U`,
				authData
			)
			.then((response) => {
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("userId", response.data.localId);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch((error) => {
				console.error(error);
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	// console.log("[ACTION]", path);
	return {
		type: actions.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) dispatch(logout());
		else {
			const expirationTime = new Date(
				localStorage.getItem("expirationDate")
			);
			if (expirationTime <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationTime.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
