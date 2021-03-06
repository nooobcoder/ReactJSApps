import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false,
	};
	// A GET HTTP request is a side-effect and should be done inside componentDidMount. Check REACT docs for more information.
	componentDidMount() {
		axios
			.get("https://jsonplaceholder.typicode.com/posts")
			.then((response) => {
				const posts = response.data.slice(0, 10); // Limiting first 4 posts only
				const updatedPosts = posts.map((post) => {
					return { ...post, author: "Ankur" };
				});
				this.setState({ posts: updatedPosts });
				// console.log(this.state.posts);
			})
			.catch((error) => this.setState({ error: true }));
	}

	postSelectedHandler(post_id) {
		this.setState({ selectedPostId: post_id });
	}

	render() {
		let posts = (
			<p style={{ textAlign: "center" }}>"Something went wrong"</p>
		);
		if (!this.state.error) {
			posts = this.state.posts.map((post) => (
				<Post
					key={post.userId + post.id}
					clicked={this.postSelectedHandler.bind(this, post.id)}
					title={post.title}
					author={post.author}
				/>
			));
		}
		return (
			<div>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
