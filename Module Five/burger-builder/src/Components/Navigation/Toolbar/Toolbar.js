import React from "react";
import classes from "./Toolbar.css";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuth={props.isAuth} />
			</nav>
		</header>
	);
};

/* <Logo height="80%" />
<div>LOGO</div> */
export default Toolbar;
