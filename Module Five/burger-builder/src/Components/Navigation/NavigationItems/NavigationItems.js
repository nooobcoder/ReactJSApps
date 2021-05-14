import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact click={props.clicked}>
				Burger Builder
			</NavigationItem>
			{props.isAuth ? (
				<NavigationItem link="/orders" click={props.clicked}>
					Orders
				</NavigationItem>
			) : null}

			{!props.isAuth ? (
				<NavigationItem link="/auth" click={props.clicked}>
					Authentication
				</NavigationItem>
			) : (
				<NavigationItem link="/logout" click={props.clicked}>
					LOG OUT
				</NavigationItem>
			)}
		</ul>
	);
};

export default NavigationItems;
