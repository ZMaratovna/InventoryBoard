import React from 'react';
import s from './placeItem.module.scss';
import classNames from 'classnames';
const PlaceItem = ({ item, currentLocation, location, setChildNodes }) => {
	const [isActive, setIsActive] = React.useState(false);
	let children = null;

	const getChildNodes = async (e) => {
		if (e.target.childNodes && e.target.childNodes.length !== 1) {
			const nodes = [];
			e.target.childNodes[1].childNodes.forEach((el) => {
				if (el.childNodes.length === 1) {
					nodes.push(el.getAttribute('place'));
				} else {
					el.childNodes[1].childNodes.forEach((node) => {
						if (node.childNodes.length === 1) {
							nodes.push(node.getAttribute('place'));
						} else {
							nodes.push(node.getAttribute('place'));
						}
					});
				}
			});

			await setChildNodes(nodes);
		} else {
			await setChildNodes([e.target.getAttribute('place')]);
		}
	};

	const handleClick = async (e) => {
		e.stopPropagation();

		const location = e.target.getAttribute('place');

		currentLocation(location);
		setIsActive(true);
		getChildNodes(e);
	};

	let classNamesForLi = classNames({
		[s.active]: location === item.id && isActive,
	});

	if (item.children && item.children.length) {
		children = (
			<ul className={s.innerUl}>
				{item.children.map((i) => (
					<PlaceItem
						item={i}
						key={i.id}
						currentLocation={currentLocation}
						setChildNodes={setChildNodes}
					/>
				))}
			</ul>
		);
	}
	return (
		<li className={classNamesForLi} place={item.id} onClick={handleClick}>
			{item.data.name}
			{children}
		</li>
	);
};

export default PlaceItem;
