import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./MainNavigation.module.css";

import FavoritesContext from "../../store/favorites-context";

function MainNavigation() {
	const favoritesContext = useContext(FavoritesContext);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>React Meetups</div>
			<nav>
				<ul>
					<li>
						<Link to="/">All Meetups</Link>
					</li>
					<li>
						<Link to="/new-meetup">New Meetups</Link>
					</li>
					<li>
						<Link to="/favorites">
							Favorites
							<span className={styles.badge}>
								{favoritesContext.totalFavorites}
							</span>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
