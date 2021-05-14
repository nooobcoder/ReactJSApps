import React from "react";
import classes from "./input.css";

const Input = (props) => {
	let inputElem = null;
	let inputClasses = [classes.InputElement];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	switch (props.elementType) {
		case "input":
			inputElem = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changedHandler}
				/>
			);
			break;
		case "textarea":
			inputElem = (
				<textarea
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changedHandler}
				/>
			);
			break;
		case "select":
			inputElem = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changedHandler}
				>
					{props.elementConfig.options.map((option) => {
						return (
							<option value={option.value} key={option.key}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElem = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changedHandler}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElem}
		</div>
	);
};

export default Input;
