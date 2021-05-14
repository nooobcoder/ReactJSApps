import React from "react";
import UserOutput from "./UserOutput.css";

const userOutput = (props) => {
	return (
		<div style={UserOutput} className="UserOutput">
			<p>Username passed: {props.userName} </p>
			<p>Some random text</p>
			<p>I hope, I'll be overwritten.</p>
		</div>
	);
};

export default userOutput;
