import React, { Component } from "react";
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../../hoc/AsyncComponent";

import "./Blog.css";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
const AsyncNewPost = asyncComponent(() => {
	return import("./NewPost/NewPost");
});

class Blog extends Component {
	state = {
		userAuthenticated: true,
	};
	render() {
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/posts/"
									exact
									activeClassName="my-active"
									activeStyle={{
										color: "#fa923f",
										textDecoration: "underline",
									}}
								>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true",
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
				<Switch>
					{this.state.userAuthenticated ? (
						<Route path="/new-post" component={AsyncNewPost} />
					) : null}
					{/* {this.state.userAuthenticated ? (
						<Route path="/new-post" component={NewPost} />
					) : null} */}
					<Route path="/posts" component={Posts} />
					<Redirect from="/" exact to="/posts" />
					{/* Any other requests to 404 Page below */}
					<Route
						render={() => (
							<h1 style={{ width: "100%", textAlign: "center" }}>
								404 Resource not found!
							</h1>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default Blog;
