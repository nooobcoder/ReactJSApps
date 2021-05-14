import React, { useEffect, useRef, useContext, memo } from "react";
import styled from "styled-components";
import AuthContext from "../../context/login-context";

const cockpit = (props) => {
	const toggleButtonRef = useRef();
	const authContext = useContext(AuthContext);
	useEffect(() => {
		console.log("[COCKPIT.JS] useEffect");
		toggleButtonRef.current.click();
		/* setTimeout(() => {
			alert("Saved data to cloud!");
		}, 1000); */
		return () => {
			console.log("[COCKPIT.JS] cleanup work in useEffect");
		};
	}, []);

	useEffect(() => {
		console.log("[COCKPIT.JS] 2nd useEffect");
		return () => {
			console.log("[COCKPIT.JS] 2nd cleanup work in useEffect");
		};
	});

	const StyledButton = styled.button`
		background-color: ${(props) => (props.alt === 1 ? "red" : "green")};
		color: white;
		font: inherit;
		border: 1px solid blue;
		padding: 8px;
		cursor: pointer;

		&:hover {
			background-color: ${(props) =>
				props.alt === 1 ? "salmon" : "lightgreen"};
			color: black;
		}
	`;

	const LoginButton = styled.button`
		color: black;
		background-color: lightgreen;
		font: inherit;
		border: 1px solid blue;
		padding: 8px;
		cursor: pointer;
	`;

	const classes = [];
	if (props.personsLength <= 2) {
		classes.push("red"); // classes = ['red']
	}
	if (props.personsLength <= 1) {
		classes.push("bold"); // classes = ['red', 'bold']
	}
	return (
		<div>
			{/* <h1>Hi, I'm a { } App</h1> */}
			<h1>{props.title}</h1>
			<p className={classes.join(" ")}>This is really working!</p>
			<StyledButton
				ref={toggleButtonRef}
				alt={props.showPersons ? 1 : 0}
				onClick={props.togglePersonsHandler}
			>
				Toggle Persons
			</StyledButton>
			<br></br>
			<LoginButton onClick={authContext.login}>Login</LoginButton>
		</div>
	);
};

export default memo(cockpit);
