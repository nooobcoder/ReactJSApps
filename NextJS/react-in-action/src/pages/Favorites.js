import React, { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/layout/meetups/MeetupList";

function Favorites() {
	const favoritesContext = useContext(FavoritesContext);

	return (
		<section>
			<h1>Favorited 💗 Meetups</h1>
			{/* Displaying the favorited list of meetups */}
			{favoritesContext.totalFavorites === 0 ? (
				<p>You have not favorites yet 😞! Start adding some.</p>
			) : (
				<MeetupList meetups={favoritesContext.favorites} />
			)}
		</section>
	);
}

export default Favorites;
