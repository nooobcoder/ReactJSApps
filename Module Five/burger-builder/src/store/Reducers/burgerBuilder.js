import * as actions from "../Actions/actionTypes";
import { updateObject } from "../utility";

const IngredientPrices = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	purchasable: false,
	loading: true,
	building: false,
};

let updatedIngredient = null;
let updatedIngredients = null;
let updatedState = null;

const addIngredient = (state, action) => {
	updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + IngredientPrices[action.ingredientName],
		building: true,
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	};
	updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + IngredientPrices[action.ingredientName],
		building: true,
	};
	return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
		loading: false,
		building: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actions.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actions.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actions.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		default:
			return state;
	}
};

export default reducer;
