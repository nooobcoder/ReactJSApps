import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Button, Modal } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function Todo(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");

	const updateToDo = () => {
		setOpen(false);
		db.collection("todos")
			.doc(props.object.id)
			.set({ todo: input }, { merge: true })
			.then(setOpen(false));
	};

	return (
		<>
			<Modal open={open} onClose={(event) => setOpen(false)}>
				<div className={classes.paper}>
					<h1>Open</h1>
					<input
						value={input}
						placeholder={props.object.todo}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button onClick={(event) => updateToDo()}>UPDATE</Button>
				</div>
			</Modal>
			<List>
				<ListItem>
					{/* <ListItemAvatar></ListItemAvatar> */}
					<ListItemText
						primary={props.object.todo}
						secondary="TODO!"
					/>
				</ListItem>
				<button onClick={(event) => setOpen(true)}>EDIT</button>
				<DeleteForeverIcon
					onClick={(event) =>
						db.collection("todos").doc(props.object.id).delete()
					}
				/>
			</List>
		</>
	);
}

export default Todo;
