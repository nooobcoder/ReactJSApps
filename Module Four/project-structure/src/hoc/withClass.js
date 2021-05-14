import React from "react";

// TYPE 1 OF 2 of HOC
/* const withClass = (props) => (
	<div className={props.classes}>{props.children}</div>
	); */

// TYPE 2 OF 2 of HOC
const withClass = (WrappedComponent, className) => {
	return (props) => (
		<div className={className}>
			<WrappedComponent {...props} />
		</div>
	);
};

export default withClass;
