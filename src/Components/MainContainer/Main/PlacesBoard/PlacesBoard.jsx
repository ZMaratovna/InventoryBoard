import React from 'react';
import s from './placesBoard.module.scss';
import PlaceItem from './PlaceItem/PlaceItem';
const PlacesBoard = (props) => {
	const [activeTab, setActiveTab] = React.useState('');
	return (
		<div className={s.board}>
			<h1>Список помещений</h1>
			<ul className={s.mainList}>
				{props.tree.map((place) => (
					<PlaceItem
						item={place}
						key={place.id}
						currentLocation={props.currentLocation}
						location={props.location}
						setChildNodes={props.setChildNodes}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				))}
			</ul>
		</div>
	);
};

export default PlacesBoard;
