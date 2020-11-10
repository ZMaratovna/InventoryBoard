import React from 'react';
import s from './inventoryBoard.module.scss';
import InventoryItem from './InventoryItem/InventoryItem';
import InventoryForm from './InventoryForm/InventoryForm';

const InventoryBoard = ({
	data,
	location,
	childNodes,
	forceUpdate,
	setIsEmpty,
}) => {
	const [placeInventory, setPlaceInventory] = React.useState([]);
	const [onCreate, setOnCreate] = React.useState(false);

	const isLastChild =
		(childNodes.length === 1 || childNodes.length === 0) &&
		location !== 'main';

	const filterData = (data, childNodes, location) => {
		if (location === 'main' || location === 'production') {
			const filtered = data.filter((el) => {
				if (
					childNodes.indexOf(el.placeId) !== -1 ||
					childNodes.indexOf(location) !== -1
				) {
					el.key = el.id;
					return el;
				}
			});
			return filtered;
		} else {
			const filtered = data.filter((el) => {
				if (childNodes.indexOf(el.placeId) !== -1) {
					return el;
				}
			});

			if (filtered.length === 0) {
				setIsEmpty(true);
			} else {
				setIsEmpty(false);
			}
			return filtered;
		}
	};

	React.useEffect(() => {
		const showInventory = async () => {
			if (childNodes && childNodes.length) {
				await setPlaceInventory(filterData(data, childNodes, location));
			} else if (!childNodes.length && location) {
				await setPlaceInventory(filterData(data, location, location));
			}
		};

		showInventory();
	}, [location, childNodes, onCreate]);

	const handleButtonClick = (e) => {
		setOnCreate(true);
	};

	if (placeInventory.length) {
		return (
			<div className={s.board}>
				<h1>Список оборудования</h1>
				<ul>
					{placeInventory.map((item) => (
						<InventoryItem
							key={item.id}
							item={item}
							childNodes={childNodes}
							location={location}
							forceUpdate={forceUpdate}
						/>
					))}
				</ul>
				{isLastChild && (
					<button className={s.addButton} onClick={handleButtonClick}>
						Add new
					</button>
				)}
				{onCreate && (
					<InventoryForm
						location={location}
						setOnCreate={setOnCreate}
						forceUpdate={forceUpdate}
					/>
				)}
			</div>
		);
	} else if (onCreate) {
		return <InventoryForm location={location} setOnCreate={setOnCreate} />;
	} else {
		return (
			<div className={s.board}>
				<h1>Пока ничего нет</h1>

				{isLastChild && (
					<button className={s.addButton} onClick={handleButtonClick}>
						Add new
					</button>
				)}
			</div>
		);
	}
};

export default InventoryBoard;
