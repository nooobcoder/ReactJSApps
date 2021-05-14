import React from "react";
import CharComponent from "./CharComponent.css";

const CharacterComponent = (props) => {
	return (
		<div style={CharComponent} onClick={props.removeChar} className="box">
			{props.char}
		</div>
	);
};

export default CharacterComponent;
