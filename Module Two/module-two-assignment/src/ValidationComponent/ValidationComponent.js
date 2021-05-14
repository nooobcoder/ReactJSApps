import React from "react";

const Validator = (props) => {
	const stringValidatedResult =
		props.inputLength <= 5 ? "too short" : "too long";
	return <p>Input string is, {stringValidatedResult}</p>;
};

export default Validator;
