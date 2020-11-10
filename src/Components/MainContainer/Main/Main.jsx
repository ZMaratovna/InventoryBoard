import React, { Suspense } from 'react';
import s from './main.module.scss';
import InventoryBoard from './InventoryBoard/InventoryBoard';
import PlacesBoard from './PlacesBoard/PlacesBoard';
const Main = ({ places, inventory, forceUpdate }) => {
	const [currentLocation, setCurrentLocation] = React.useState('main');
	const [childNodes, setChildNodes] = React.useState([]);
	const [isEmpty, setIsEmpty] = React.useState(false);

	return (
		<div className={s.wrapper}>
			<Suspense fallback={<h1>Loading data... </h1>}>
				<PlacesBoard
					tree={places}
					currentLocation={setCurrentLocation}
					location={currentLocation}
					setChildNodes={setChildNodes}
					childNodes={childNodes}
					isEmpty={isEmpty}
				/>
				<InventoryBoard
					data={inventory}
					location={currentLocation}
					childNodes={childNodes}
					forceUpdate={forceUpdate}
					setIsEmpty={setIsEmpty}
				/>
			</Suspense>
		</div>
	);
};

export default Main;
