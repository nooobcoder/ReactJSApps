import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ key, loggedInUsername, message }, ref) => {
	const isUser = loggedInUsername === message.username;
	return (
		<div
			ref={ref}
			key={key}
			className={`message ${isUser && "message__user"}`}
		>
			<Card
				className={isUser ? "message__userCard" : "message__guestCard"}
			>
				<CardContent>
					<Box
						fontStyle="italic"
						fontWeight="fontWeightRegular"
						color="white"
					>
						<Typography variant="h6" component="h6">
							{!isUser && `${message.username}: `}
							{message.message}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</div>
	);
});

export default Message;
