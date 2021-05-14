import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";


axios.interceptors.request.use(
	(request) => {
		console.log(request);
		// Always return the request otherwise the thread would be blocked.
		return request;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log(response);
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.error(error);
	}
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
