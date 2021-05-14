import React from "react";
import { useHistory } from "react-router-dom";
import NewMeetupForm from "../components/layout/meetups/NewMeetupForm";

function NewMeetup() {
	const history = useHistory();

	const addMeetupHandler = (meetupData) => {
		fetch(process.env.REACT_APP_FIREBASE_ENDPOINT_URL + "meetups.json", {
			method: "POST",
			body: JSON.stringify(meetupData),
			headers: { "Content-Type": "application/json" },
		}).then(() => {
			history.replace("/");
		});
	};

	return (
		<section>
			<h1>ADD NEW MEETUP</h1>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</section>
	);
}

export default NewMeetup;
