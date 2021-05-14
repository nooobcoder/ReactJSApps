import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";

import classes from "./Auth.css";
import * as actions from "../../store/Actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Mail Address",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignUp: true, // Default mode of the signup/login form.
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp ? `signUp` : `signInWithPassword`
		);
	};

	switchAuthModeHandler = () => {
		this.setState(
			(prevState) => {
				return { ...this.state, isSignUp: !prevState.isSignUp };
			},
			() => {
				// console.log("AUTH MODE", this.state.isSignUp);
			}
		);
	};

	componentDidMount() {
		// console.log("component did mount");
		if (
			this.props.buildingBurger === true &&
			this.props.authRedirectPath === undefined
		) {
			this.props.onSetRedirectPath("/checkout");
		} else {
			this.props.onSetRedirectPath("/");
		}
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		const authRedirect = this.props.isAuth ? (
			<Redirect
				to={
					this.props.redirectPath
					// === undefined ? "/checkout" : "/"
				}
			/>
		) : null;
		let form = this.props.loading ? (
			<Spinner />
		) : (
			<div>
				{authRedirect}

				{this.props.error ? <p>{this.props.error.message}</p> : null}
				<form onSubmit={this.submitHandler}>
					{formElementsArray.map((formElement) => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changedHandler={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					))}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO{" "}
					{this.state.isSignUp === false ? `SIGN UP` : `SIGN IN`}
				</Button>
			</div>
		);

		return <div className={classes.Auth}>{form}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token,
		buildingBurger: state.burgerBuilder.building,
		redirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) => {
			dispatch(actions.doAuthenticate(email, password, isSignup));
		},
		onSetRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
