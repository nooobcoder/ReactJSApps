import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children
		);
	}

	/* componentDidUpdate() {
		console.log("[Modal.js] Component will update");
	} */

	render(props) {
		return (
			<Aux>
				<Backdrop
					show={this.props.show}
					clicked={this.props.modalClosed}
				/>
				<div
					style={{
						transform: this.props.show
							? "translateY(0)"
							: "translateY(-100vh)",
						opacity: this.props.show ? "1" : "0",
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
