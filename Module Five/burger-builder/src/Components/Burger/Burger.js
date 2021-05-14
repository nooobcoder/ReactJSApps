import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
	const ingredientsArray = Object.entries(props.ingredients);
	let burgerIngredientsComponents = [];
	ingredientsArray.forEach((items, index) => {
		var h;
		for (h = 0; h < items[1]; ++h) {
			burgerIngredientsComponents.push(
				<BurgerIngredient type={items[0]} key={items[0] + "_" + h} />
			);
		}
	});
	if (burgerIngredientsComponents.length === 0) {
		burgerIngredientsComponents = (
			<p>
				ADD INGREDIENTS
				<span role="img" aria-label="burger">
					🍔
				</span>
			</p>
		);
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{burgerIngredientsComponents}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
	/* return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			<BurgerIngredient type="cheese" />
			<BurgerIngredient type="meat" />
			<BurgerIngredient type="bread-bottom" />
		</div>
	); */
};

export default withRouter(Burger);
