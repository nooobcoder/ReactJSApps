import React from "react";
import { connect } from "react-redux";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosOrders from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../../store/Actions/index";

class ContactData extends React.Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your Name" },
				value: "",
				validation: { required: true },
				valid: false,
				userTouched: false,
			},
			age: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your Age" },
				value: "",
				validation: { required: true },
				valid: false,
				userTouched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Street Address",
				},
				value: "",
				validation: { required: true },
				valid: false,
				userTouched: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your ZIP Code" },
				value: "",
				validation: { required: true, minLength: 4, maxLength: 6 },
				valid: false,
				userTouched: false,
			},
			country: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your Country" },
				value: "",
				validation: { required: true, minLength: 2 },
				valid: false,
				userTouched: false,
			},
			email: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your E-Mail" },
				value: "",
				validation: { required: true },
				valid: false,
				userTouched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ key: "1", value: "fastest", displayValue: "Fastest" },
						{
							key: "2",
							value: "cheapest",
							displayValue: "Cheapest",
						},
					],
				},
				value: "fastest",
				validation: {},
				valid: true,
			},
		},
		formIsValid: true,
		// loading: false,
	};

	orderHandler(event) {
		event.preventDefault();
		// this.setState({ loading: true });

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			orderData: formData,
			totalPrice: (+this.props.price).toFixed(2), // Uploading the price from here can be manipulated
		};
		this.props.onOrderBurger(order, this.props.token);
	}

	checkFormValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	};
	inputChangedHandler = (event, selectedField) => {
		/* const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[selectedField] };
		updatedFormElement.value = event.target.value;
		updatedOrderForm[selectedField] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm }); */

		let newOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
		newOrderForm[selectedField].value = event.target.value;
		newOrderForm[selectedField].valid = this.checkFormValidity(
			newOrderForm[selectedField].value,
			newOrderForm[selectedField].validation
		);
		newOrderForm[selectedField].userTouched = true;
		this.setState({ orderForm: newOrderForm });
		this.setState(
			{ formIsValid: newOrderForm[selectedField].valid },
			() => {
				// console.log(this.state.formIsValid)
			}
		);
	};

	render() {
		const formElementsArray = [];
		for (let keys in this.state.orderForm) {
			formElementsArray.push({
				id: keys,
				config: this.state.orderForm[keys],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler.bind(this)}>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							changedHandler={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.userTouched}
						/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(action.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axiosOrders));
