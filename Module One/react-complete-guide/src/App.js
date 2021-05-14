import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
	state = {
		persons: [
			{ name: 'Max', age: 18 },
			{ name: 'Manu', age: 29 },
			{ name: 'Stephanie', age: 32 },
		],
		otherState: 'Some other state',
	};

	switchNameHandler = (name) => {
		this.setState({
			persons: [
				{ name, age: 21 },
				{ name: 'Manu', age: 29 },
				{ name: 'Stephanie', age: 27 },
			]
		})
	};

	nameChangedHandler = (event) => {
		this.setState({
			persons: [
				{ name: 'Max', age: 18 },
				{ name: event.target.value, age: 29 },
				{ name: 'Stephanie', age: 12 },
			],
		});
	}

	render() {

		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
		}

		return (
			<div className="App" >
				<h1>Hi, I'm a React App</h1>
				<p>This is really working!</p>
				<button style={style} onClick={this.switchNameHandler.bind(this, 'SANDHYA')}>Switch Names</button>
				<Person changeName={this.switchNameHandler.bind(this, 'Aishi!')} name={this.state.persons[0].name} age={this.state.persons[0].age} />
				<Person changeName={this.switchNameHandler.bind(this, '')} change={this.nameChangedHandler} name={this.state.persons[1].name} age={this.state.persons[1].age} >My hobbies: Racing</Person>
				<Person changeName={this.switchNameHandler.bind(this, '')} name={this.state.persons[2].name} age={this.state.persons[2].age}></Person>

			</div>
		);
		// return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi! This is a React App!'));
	}
};

export default App;



// USING REACT HOOKS HERE

/* const [personsState, setPersonsState] = useState({
	persons: [
		{ name: 'Max', age: 18 },
		{ name: 'Manu', age: 29 },
		{ name: 'Stephanie', age: 32 },
	],
	otherState: 'Some other state',
});

const switchNameHandler = () => {
	setPersonsState({
		persons: [
			{ name: 'Ankur', age: 21 },
			{ name: 'Manu', age: 29 },
			{ name: 'Stephanie', age: 27 },
		]
	});
	console.log('SET UPDATED!')


		<Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
				<Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My hobbies: Racing</Person>
				<Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
} */