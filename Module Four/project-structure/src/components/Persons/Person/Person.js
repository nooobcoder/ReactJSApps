import PropTypes from "prop-types";
import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import AuthContext from "../../../context/login-context";
import "./Person.css";

// import styled from "styled-components";
/* 
const StyledDiv = styled.div`
	width: 60%;
	margin: 16px auto;
	border: 1px solid #eee;
	box-shadow: 0 2px 3px #ccc;
	padding: 16px;
	text-align: center;

	@media (min-width: 500px) {
		width: 450px;
	}
`; */

class Person extends Component {
	inputElement = {};
	static contextType = AuthContext;
	componentDidMount() {
		this.inputElement.focus();
		console.log(this.context.authenticated);
	}

	render() {
		console.log(`[Person.js] Rendering component...`);
		return (
			<Aux>
				{this.context.authenticated ? (
					<p>Authenticated</p>
				) : (
					<p>Please Authenticate</p>
				)}

				<p onClick={this.props.click}>
					I'm {this.props.name} and I am {this.props.age} years old!
				</p>
				<p>{this.props.children}</p>
				<input
					type="text"
					// ref={(inputEl) => (this.inputElement = inputEl)}
					ref={(inputEl) => {
						this.inputElement = inputEl;
					}}
					onChange={this.props.changed}
					value={this.props.name}
				/>
			</Aux>
		);
	}
}

Person.propTypes = {
	age: PropTypes.number,
	changed: PropTypes.func,
	children: PropTypes.any,
	click: PropTypes.func,
	name: PropTypes.string,
};

export default withClass(Person, "person");
