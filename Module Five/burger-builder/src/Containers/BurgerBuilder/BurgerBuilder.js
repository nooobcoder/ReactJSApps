import React, { Component } from "react";
import { connect } from "react-redux";
import axiosOrders from "../../axios-orders";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/Actions/index";

class BurgerBuilder extends Component {
	state = {
		/* 	ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		}, */
		// ingredients: null, Not using this, REDUX is now the state manager
		purchasing: false,
		// loading: true,
		// error: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
		/* axiosOrders
			.get(
				"https://burgerreact-73bff-default-rtdb.firebaseio.com/ingredients.json"
			)
			.then((response) => this.setState({ ingredients: response.data }))
			.catch((error) => {
				this.setState({ error: true });
			}); */
	}

	updatePurchaseState() {
		const sum = Object.keys(this.props.ings)
			.map((igKey) => {
				return this.props.ings[igKey];
			})
			.reduce((sum, el) => sum + el, 0);
		return sum > 0;
	}

	// ES6 style and does not requires to be bind.
	/* 	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}; */

	purchaseHandler() {
		if (this.props.isAuth) this.setState({ purchasing: true });
		else {
			this.props.onSetRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	}

	// The backdrop of the modal is closed when clicked outside the modal.
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseConfirmHandler() {
		this.props.onPurchaseInit();
		this.props.history.push("/checkout");
	}

	render() {
		let disabledInfo = { ...this.props.ings };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		if (this.props.loading) orderSummary = <Spinner />;

		let burger = this.props.loading ? <Spinner /> : null;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						totalPrice={this.props.price}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						purchasable={this.updatePurchaseState()}
						isAuth={this.props.isAuth}
						ordered={this.purchaseHandler.bind(this)}
						disabled={disabledInfo}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					cancelOrder={this.purchaseCancelHandler}
					confirmOrder={this.purchaseConfirmHandler.bind(this)}
					totalPrice={this.props.price}
				/>
			);
		}
		if (this.props.loading) orderSummary = <Spinner />;
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		loading: state.burgerBuilder.loading,
		isAuth: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitIngredients: () =>
			dispatch(actions.fetchIngredientsFromFirebase()),
		onIngredientAdded: (ingName) =>
			dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
