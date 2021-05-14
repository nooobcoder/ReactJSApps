import React, { Component } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";

import classes from "./App.css";
import Aux from "../hoc/Aux";
import AuthContext from "../context/login-context";

class App extends Component {
	state = {};
	constructor(props) {
		super(props);
		console.log("Constructor -> App.js invoked");
		this.state = {
			persons: [
				{ id: "asfa1", name: "Max", age: 28 },
				{ id: "vasdf1", name: "Manu", age: 29 },
				{ id: "asdf11", name: "Stephanie", age: 26 },
			],
			otherState: "some other value",
			showPersons: false,
			showCockpit: true,
			changeCounter: 0,
			authenticated: false,
		};
	}

	static getDerivedStateFromProps(props, state) {
		console.log(`[App.js] getDerivedStateFromProps ${props}`);
		return state;
	}

	componentDidMount() {
		console.log(`[App.js] Components rendered and mount.`);
	}

	shouldComponentUpdate(nextState, nextProps) {
		console.log("[APP.JS] shouldComponentUpdate");
		return true;
	}

	componentDidUpdate() {
		console.log("[APP.JS] componentDidUpdate");
	}

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex],
		};

		person.name = event.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person;
		this.setState((prevState, props) => {
			return {
				persons: persons,
				changeCounter: prevState.changeCounter + 1,
			};
		});
	};

	loginHandler = () => {
		this.setState({ authenticated: true });
	};

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	render() {
		const style = {
			backgroundColor: "green",
			color: "white",
			font: "inherit",
			border: "1px solid blue",
			padding: "8px",
			cursor: "pointer",
			":hover": {
				backgroundColor: "lightgreen",
				color: "black",
			},
		};

		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<Persons
					isAuthenticated={this.state.authenticated}
					showPersons={this.state.showPersons}
					persons={this.state.persons}
					clicked={this.deletePersonHandler}
					changed={this.nameChangedHandler}
				></Persons>
			);
		}

		return (
			// <div className="App">
			// WithClass is a HigherOrderComponent located inside hoc folder at the project root.
			// <WithClass classes="App">
			<AuthContext.Provider
				value={{
					authenticated: this.state.authenticated,
					login: this.loginHandler,
				}}
			>
				<Aux>
					<button
						onClick={() => {
							var isCockpitVisible = this.state.showCockpit;
							this.setState({ showCockpit: !isCockpitVisible });
							console.log(this.state.showCockpit);
						}}
					>
						Toggle Cockpit!
					</button>
					{this.state.showCockpit ? (
						<Cockpit
							title={this.props.appTitle}
							personsLength={this.state.persons.length}
							// login={this.loginHandler}
							showPersons={this.state.showPersons}
							togglePersonsHandler={this.togglePersonsHandler}
						/>
					) : null}
					{persons}
				</Aux>
			</AuthContext.Provider>
			// </WithClass>
			// </div>
		);
	}
}

export default withClass(App, "App");
