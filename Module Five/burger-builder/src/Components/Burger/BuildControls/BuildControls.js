import PropTypes from "prop-types";
import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Meat", type: "meat" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
];

function BuildControls(props) {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>₹{props.totalPrice.toFixed(2)}</strong>
			</p>
			{controls.map((element) => (
				<BuildControl
					key={element.label}
					label={element.label}
					added={() => props.ingredientAdded(element.type)}
					removed={() => props.ingredientRemoved(element.type)}
					disabled={props.disabled[element.type]}
				/>
			))}
			<button
				onClick={props.ordered}
				className={classes.OrderButton}
				disabled={!props.purchasable}
			>
				{props.isAuth ? "ORDER NOW" : "SIGN UP TO CONTINUE"}
			</button>
		</div>
	);
}

BuildControls.propTypes = {
	disabled: PropTypes.any,
	ingredientAdded: PropTypes.func,
	ingredientRemoved: PropTypes.func,
	totalPrice: PropTypes.number,
	purchasable: PropTypes.bool,
};

export default BuildControls;
