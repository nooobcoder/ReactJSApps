import axios from "axios";

const instance = axios.create({
	baseURL: "https://burgerreact-73bff-default-rtdb.firebaseio.com/", // This is the endpoint of the realtime database
});

export default instance;
