import React, { useState, useEffect } from "react";
import MeetupList from "../components/layout/meetups/MeetupList";

/* const DUMMY_DATA = [
	{
		id: "m1",
		title: "First Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/1/14/Landscape_Arnisee-region.JPG",
		address: "First Address",
		description: "This is the description of the first meetup",
	},
	{
		id: "m2",
		title: "Second Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/d/db/Busy_biketraffic_at_the_Tea_Garden_at_Enspijk_with_all_fruit_blossom_trees_at_25_April_2015_-_panoramio.jpg",
		address: "Second Address",
		description: "This is the description of the second meetup",
	},
	{
		id: "m3",
		title: "Third Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/0/04/Konikpaarden_in_de_Bemmelse_uiterwaarden.jpg",
		address: "Third Address",
		description: "This is the description of the third meetup",
	},
	{
		id: "m4",
		title: "Fourth Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/8/87/Sakuradote02_1920.jpg",
		address: "Meetup Stree, 678 Julie Max Road",
		description: "This is the description of the Fourth meetup",
	},
];
 */

function AllMeetupsPage() {
	const [isLoading, setLoadingState] = useState(true);
	const [loadedMeetups, setLoadedMeetups] = useState([]);

	useEffect(() => {
		setLoadingState(true);
		fetch(process.env.REACT_APP_FIREBASE_ENDPOINT_URL + "meetups.json")
			.then((response) => response.json())
			.then((data) => {
				var meetups = [];
				for (const key in data) meetups.push({ id: key, ...data[key] });
				
				setLoadingState(false);
				setLoadedMeetups(meetups);
			});
	}, []);

	return isLoading ? (
		<section>
			<p>LOADING!</p>
		</section>
	) : (
		<section>
			<h1>All Meetups</h1>
			<MeetupList meetups={loadedMeetups} />
		</section>
	);
}

export default AllMeetupsPage;
