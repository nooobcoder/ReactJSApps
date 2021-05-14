import React from "react";
import { Route, Switch } from "react-router";
import AnotherScreen from "./AnotherScreen";
import "./App.css";
import Home from "./Home";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/another" exact component={AnotherScreen} />
				</Switch>
			</header>
		</div>
	);
}

export default App;
