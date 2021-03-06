import React from "react";
import ReactDOM from "react-dom";
// import "./App.css";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const App = () => {
	const createOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: "0.01",
					},
				},
			],
		});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture();
	};

	return (
		<App>
			<div>
				<PayPalButton
					createOrder={(data, actions) => createOrder(data, actions)}
					onApprove={(data, actions) => onApprove(data, actions)}
				/>
			</div>
		</App>
	);
};

export default App;
