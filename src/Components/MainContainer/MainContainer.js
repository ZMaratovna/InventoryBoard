import React, { useEffect, useState } from 'react';
import { getFirestore } from '../../Firebase';
import { createTree } from '../../utils';
import Main from './Main/Main';

const MainContainer = () => {
	const [places, setPlaces] = useState([]);
	const [inventory, setInventory] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const placesDocs = await getFirestore('places');
			const places = placesDocs.docs.map((doc) => ({
				data: doc.data(),
				id: doc.id,
				parts:
					doc.data().parts && doc.data().parts.map((part) => part.id),
			}));
			setPlaces(createTree(places));
			const inventory = await getFirestore('inventory');
			setInventory(
				inventory.docs.map((doc) => {
					try {
						return {
							data: doc.data(),
							id: doc.id,
							placeId: doc.data().place.id,
						};
					} catch (e) {
						return {
							data: doc.data(),
							id: doc.id,
							placeId: null,
						};
					}
				})
			);
		};
		fetchData();
	}, []);

	return (
		<Main places={places} inventory={inventory}  />
	);
};
export default MainContainer;
