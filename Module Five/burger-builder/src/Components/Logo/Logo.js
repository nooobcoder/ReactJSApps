import React from "react";
import burgerLogo from "../../assets/images/burger-logo-2.png";
import classes from "./Logo.css";

const Logo = (props) => {
	return (
		<div className={classes.Logo} style={{ height: props.height }}>
			<img src={burgerLogo} alt="Burger Logo" />
		</div>
	);
};

export default Logo;
