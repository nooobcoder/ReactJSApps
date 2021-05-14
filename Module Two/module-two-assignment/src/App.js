import React, { Component } from "react";
import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponent from "./CharComponent/CharComponent";
import "./App.css";

class App extends Component {
	state = {
		userInput: "",
		inputLength: 0,
	};

	inputChangedHandler = (event) => {
		this.setState({
			userInput: event.target.value,
			inputLength: event.target.value.length,
		});
	};

	removeCharacterFromString = (index) => {
		const deletedString =
			this.state.userInput.substring(0, index) +
			this.state.userInput.substring(index + 1);
		const newLength = deletedString.length;
		console.log(deletedString, newLength);
		this.setState({
			userInput: deletedString,
			inputLength: newLength,
		});
	};

	render() {
		var elements = (
			<p>
				Length of input "{this.state.userInput}" is,{" "}
				{this.state.inputLength} characters
			</p>
		);

		const charList = this.state.userInput.split("").map((char, index) => {
			return (
				<CharComponent
					removeChar={() => this.removeCharacterFromString(index)}
					char={char}
					key={index}
				/>
			);
		});
		return (
			<div className="App">
				<input
					type="text"
					onChange={this.inputChangedHandler.bind(this)}
					value={this.state.userInput}
				></input>
				{this.state.inputLength !== 0 ? elements : null}
				<ValidationComponent inputLength={this.state.inputLength} />
				{charList}
			</div>
		);
	}
}

export default App;
