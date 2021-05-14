import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from "./Containers/Layout/Layout";
import Logout from "./Containers/Authentication/Logout/Logout";
import * as actions from "./store/Actions/index";
import asynComponent from "./hoc/AsyncComponent/asynComponent";

const asyncCheckout = asynComponent(() => {
	return import("./Containers/Checkout/Checkout");
});
const asyncOrders = asynComponent(() => {
	return import("./Containers/Orders/Orders");
});
const asyncAuth = asynComponent(() => {
	return import("./Containers/Authentication/Auth");
});

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		let guardRoutes = null;
		if (this.props.isAuth !== null) {
			guardRoutes = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			);
		} else {
			guardRoutes = (
				<Switch>
					<Route path="/auth" component={asyncAuth} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{guardRoutes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
