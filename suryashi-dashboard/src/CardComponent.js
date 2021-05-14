import React from "react";
import "./CardComponent.css";
const CardComponent = () => {
	return (
		<div>
			<a href="#" class="card">
				<div class="card__head">
					<div class="card__image"></div>
					<div class="card__author">
						<div class="author">
							<img
								src="https://www.dropbox.com/s/qov3z518m3u8cwj/travel-agency-logo.jpg?raw=1"
								class="author__image"
								alt=""
							/>
							<div class="author__content">
								<p class="author__header">Rick Brown</p>
								<p class="author__subheader">
									Traveller & Blogger
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="card__body">
					<h2 class="card__headline">Maldives</h2>
					<p class="card__text">
						Maldives, officially the Republic of Maldives, is a
						small archipelagic state in South Asia, situated in the
						Arabian Sea of the Indian Ocean. It lies southwest of
						Sri Lanka and India.
					</p>
				</div>
				<div class="card__foot">
					<span class="card__link">Read more</span>
				</div>
				<div class="card__border"></div>
			</a>
		</div>
	);
};

export default CardComponent;
