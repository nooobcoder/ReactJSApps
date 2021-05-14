import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Order from "../../Components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/Actions";

class Orders extends React.Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token);
	}
	redirectToAuthenticate = () => {
		return <Redirect to="/auth" />;
	};

	render() {
		// console.log(this.state.orders);
		const orders = !this.props.loading ? (
			this.props.orders
				.reverse()
				.map((order) => (
					<Order
						ingredients={order.ingredients}
						totalPrice={(+order.totalPrice).toFixed(2)}
						key={order.id}
					/>
				))
		) : (
			<Spinner />
		);
		return <div>{orders}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
