import React, { createContext } from "react";

const authContext = createContext({
	login: () => {},
	authenticated: false,
});

export default authContext;
