import React from "react";
import UserInput from "./UserInput.css";

const userInput = (props) => {
	return (
		<input
			style={UserInput}
			typex="text"
			onChange={props.changeHandler}
			value={props.userName}
		></input>
	);
};

export default userInput;
