import React, { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	// InputLabel,
	Input,
	// IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Message from "./Component/Message";
import db from "./firebase-config";
import "./App.css";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		/* { username: "Ankur", message: "Hi" },
		{ username: "Qazi", message: "Hello World" },
		{ username: "Ankur", message: "This is a message" }, */
	]);
	const [username, setUsername] = useState("");

	const sendMessage = (event) => {
		event.preventDefault();
		// All the logic to send the message resides here
		db.collection("messages").add({
			username: username,
			message: input.trim(),
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");

		document
			.getElementById("root")
			.scrollIntoView({ behavior: "smooth", block: "end" });
	};

	useEffect(() => {
		// Run once when the app is loaded. This would fetch the content from the database.
		db.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				switch (snapshot.state) {
				}

				setMessages(
					snapshot.docs.map((document) => ({
						id: document.id,
						data: document.data(),
					}))
				);
			});
	}, []);

	useEffect(() => {
		setUsername(prompt("Username: ", "guest"));
	}, []);

	return (
		<div className="App" id="root">
			<img
				src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"
				alt="app-logo"
			/>
			<p
				style={{ color: "#F3D000 ", fontSize: "60px" }}
			>{`Welcome ${username}`}</p>
			<h2 style={{ color: "#F3D000 " }}>
				Facebook messenger clone by Ankur Paul!
			</h2>
			{username ? (
				<div
					style={{
						paddingBottom: "150px",
					}}
				>
					<FlipMove>
						{messages.map((obj) => (
							<Message
								key={obj.id}
								loggedInUsername={username}
								message={obj.data}
							/>
						))}
					</FlipMove>
					<form className="app__form">
						<FormControl className="form__control">
							{/* <InputLabel>Enter a message...</InputLabel> */}
							<Input
								className="app__input"
								placeholder="Type something..."
								value={input}
								onChange={(event) => {
									setInput(event.target.value);
								}}
							/>

							<Button
								className="app__iconbutton"
								disabled={!input}
								type="submit"
								variant="contained"
								color="primary"
								onClick={sendMessage}
								// className={classes.button}
								endIcon={<SendIcon />}
							/>
						</FormControl>
					</form>
				</div>
			) : null}
		</div>
	);
}

export default App;
