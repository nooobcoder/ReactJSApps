import React, { Component } from "react";
import styledComponents from "styled-components";
import Person from "./Person/Person";
import "./App.css";

const StyledButton = styledComponents.button`
	background-color: ${(props) => (props.alt === 1 ? "red" : "green")};
	color: white;
	font: inherit;
	border: 1px solid blue;
	padding: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => (props.alt === 1 ? "salmon" : "lightgreen")}};
		color: black;
	}
`;
class App extends Component {
	state = {
		persons: [
			{ id: "person1", name: "Max", age: 18 },
			{ id: "person2", name: "Manu", age: 29 },
			{ id: "person3", name: "Stephanie", age: 32 },
		],
		otherState: "Some other state",
		showPersons: false,
	};

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex],
		};

		// const person = Object.assign({}, this.state.persons[personIndex]);

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({ persons: persons });
	};

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	render() {
		/* 	const style = {
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
		}; */

		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								click={() => this.deletePersonHandler(index)}
								name={person.name}
								age={person.age}
								key={person.id}
								changed={(event) =>
									this.nameChangedHandler(event, person.id)
								}
							/>
						);
					})}
				</div>
			);

			/* style.backgroundColor = "red";
			style[":hover"] = {
				backgroundColor: "salmon",
				color: "black",
			}; */
		}
		let classes = []; // red bold classes are appen
		if (this.state.persons.length <= 2) {
			classes.push("red");
		}
		if (this.state.persons.length <= 1) {
			classes.push("bold");
		}

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<p className={classes.join(" ")}>This is really working!</p>
				<StyledButton
					alt={this.state.showPersons ? 1 : 0}
					onClick={this.togglePersonsHandler}
				>
					Toggle Persons
				</StyledButton>
				{persons}
			</div>
		);
		// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
	}
}

export default App;

/*
	
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

	<StyleRoot>
	<div className="App">
		<h1>Hi, I'm a React App</h1>
		<p className={classes.join(" ")}>This is really working!</p>
		<button style={style} onClick={this.togglePersonsHandler}>
			Toggle Persons
		</button>
		{persons}
	</div>
</StyleRoot>;

export default Radium(App); */
