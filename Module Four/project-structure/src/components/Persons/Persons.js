import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
	/* static getDerivedStateFromProps(props, state) {
		console.log("[PERSONS.js] getDerivedStateFromProps");
		return state;
	} */

	/* shouldComponentUpdate(nextProps, nextState) {
		console.log("[PERSONS.js] shouldComponentUpdate");
		if (
			nextProps.persons !== this.props.persons ||
			nextProps.changed !== this.props.changed ||
			nextProps.clicked !== this.props.clicked
		)
			return true;
		else return false;
	} */

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log("[PERSONS.js] getSnapshotBeforeUpdate");
		return { message: "A Snapshot" };
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("[PERSONS.js] componentDidUpdate");
		console.log(snapshot);
	}

	componentWillUnmount() {
		console.log("[PERSONS.JS] componentWillUnmount");
	}

	render() {
		console.log(`[Persons.js] Rendering component...`);
		return this.props.persons.map((person, index) => {
			return (
				<Person
					isAuth={this.props.isAuthenticated}
					click={() => this.props.clicked(index)}
					name={person.name}
					age={person.age}
					key={person.id}
					changed={(event) => this.props.changed(event, person.id)}
				/>
			);
		});
	}
}

Persons.propTypes = {
	changed: PropTypes.func,
	clicked: PropTypes.func,
};

export default Persons;
