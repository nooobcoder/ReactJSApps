import React from "react";
import { withRouter } from "react-router-dom"; // To pass the props of the router via HOC
import "./Post.css";

// AN alternate way of importing withRouter is to pass the props to this class from it's parent component.

class Post extends React.Component {
	componentDidMount() {
		// console.log(this.props);
	}
	render(props) {
		return (
			<article className="Post" onClick={this.props.clicked}>
				<h1>{this.props.title}</h1>
				<div className="Info">
					<div className="Author">{this.props.author}</div>
				</div>
			</article>
		);
	}
}

export default withRouter(Post);
