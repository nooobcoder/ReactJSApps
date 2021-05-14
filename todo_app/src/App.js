import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import firebase from "firebase";
import Todo from "./Components/Todo";
import firebasedb from "./firebase";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	// This code fetches the todos from the firestore database.
	useEffect(() => {
		firebasedb
			.collection("todos")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setTodos(
					snapshot.docs.map((document) => ({
						id: document.id,
						todo: document.data().todo,
					}))
				)
			);
	}, []);

	const addTodo = (event) => {
		// This would be executed when the button is clicked!
		event.preventDefault(); // will prevent the default refresh behavior of forms in HTML

		firebasedb.collection("todos").add({
			todo: input.trim(),
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		}); // Inserts a document with random ID into the todos collection
		// setTodos([...todos, input.trim()]);
		setInput("");
	};

	return (
		<div className="App">
			<h1>A TODO 📝 App by Ankur Paul</h1>
			<ul
				style={{
					border: "1px solid black",
					display: "block",
					width: "50%",
					margin: "0 auto",
				}}
			>
				{todos.map((todo) => (
					<Todo object={todo} />
				))}
			</ul>
			<FormControl>
				<InputLabel htmlFor="my-input">TYPE YOUR TASK HERE</InputLabel>
				<Input
					inputProps={{ style: { textAlign: "center" } }}
					value={input}
					// placeholder="TYPE YOUR TASK HERE"
					onChange={(event) => setInput(event.target.value)}
				/>
				<Button
					disabled={!input}
					type="submit"
					onClick={addTodo}
					variant="contained"
					color="primary"
				>
					ADD TODO!
				</Button>
			</FormControl>
		</div>
	);
}

export default App;
