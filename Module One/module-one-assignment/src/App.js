import React, { Component } from "react";
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";
import "./App.css";

class App extends Component {
	state = {
		userName: "Ankur Paul",
	};

	usernameChangedHandler = (event) => {
		this.setState({
			userName: event.target.value,
		});
	};

	render() {
		return (
			<div className="App">
				<UserInput
					changeHandler={this.usernameChangedHandler}
				></UserInput>
				<UserOutput userName={this.state.userName}></UserOutput>
				<UserOutput userName={this.state.userName}></UserOutput>
				<UserOutput userName="funkywhallow"></UserOutput>
			</div>
		);
	}
}

export default App;
