import React from 'react';
import './Person.css'
const person = function person(props) {
	return (
		<div className='Person'>
			<input type="text" onChange={props.change} value={props.name}></input>
			<p onClick={props.changeName}>I'm {props.name} and I am {props.age} years old!</p>
			{(props.children) ? <p>{props.children}</p> : null}
		</div>
	)
}

export default person;