import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
	render() {
		return this.props.ings ? (
			this.props.purchased ? (
				<Redirect to="/" />
			) : (
				<div>
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCancelled={() => this.props.history.goBack()}
						checkoutContinued={() =>
							this.props.history.replace("/checkout/contact-data")
						}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={ContactData}
					/>
				</div>
			)
		) : (
			<Redirect to="/" />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps, null)(Checkout);
