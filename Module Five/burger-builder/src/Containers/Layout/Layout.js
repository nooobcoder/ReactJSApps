import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import Aux from "../../hoc/Aux/Aux";
import { connect } from "react-redux";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};
	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggledHandler = () => {
		this.setState({
			showSideDrawer: !this.state.showSideDrawer,
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar
					drawerToggleClicked={this.sideDrawerToggledHandler}
					isAuth={this.props.isAuthenticated}
				/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
					isAuth={this.props.isAuthenticated}
				/>
				<div>Toolbar, Sidedrawer, Backdrop</div>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token,
	};
};
export default connect(mapStateToProps, null)(Layout);
