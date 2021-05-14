import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
	/* 	componentDidUpdate() {
		console.log("[OrderSummary.js] Will Update");
	} */
	render(props) {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			(ingKey) => {
				return (
					<li key={ingKey}>
						<span
							style={{
								textTransform: "capitalize",
							}}
						>
							{ingKey}:{this.props.ingredients[ingKey]}
						</span>
					</li>
				);
			}
		);

		return (
			<Aux>
				<h3>Your order</h3>
				<p>A delicious burger with the following ingredients: </p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to checkout!</p>
				<p>
					<strong>
						Total Price: ₹ {this.props.totalPrice.toFixed(2)}
					</strong>
				</p>
				<Button btnType="Danger" clicked={this.props.cancelOrder}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={this.props.confirmOrder}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
