import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	};
	componentDidUpdate(props) {
		if (this.props.id)
			if (
				!this.state.loadedPost ||
				this.state.loadedPost.id !== this.props.id
			) {
				axios
					.get(
						"https://jsonplaceholder.typicode.com/posts/" +
							this.props.id
					)
					.then((response) => {
						this.setState({ loadedPost: response.data });
					});
			}
	}

	deletePostHandler = (id) => {
		console.log(id);
		axios
			.delete("https://jsonplaceholder.typicode.com/posts/" + id)
			.then((response) => {});
	};

	render(props) {
		console.log();
		let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
		if (this.props.id) {
			post = <p style={{ textAlign: "center" }}>Loading...!</p>;
		}
		if (this.state.loadedPost)
			post = (
				<div className="FullPost">
					<h1>
						{this.state.loadedPost.title.charAt(0).toUpperCase() +
							this.state.loadedPost.title.slice(1)}
					</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button
							className="Delete"
							onClick={this.deletePostHandler.bind(
								this,
								this.props.id
							)}
						>
							Delete
						</button>
					</div>
				</div>
			);
		return post;
	}
}

export default FullPost;
