import React from 'react';

export function createTree(arr) {
	const tree = Object.fromEntries(arr.map(({ parts, ...n }) => [n.id, n]));
	arr.forEach(
		(n) => (tree[n.id].children = n.parts?.map((m) => tree[m]) ?? [])
	);
	return Object.values(tree).filter((n) =>
		arr.every((m) => !m.parts?.includes(n.id))
	);
}

export const filterData = (data, childNodes, location) => {
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
		return filtered;
	}
};

export function useForceUpdate() {
	const [, setTick] = React.useState(0);
	const update = React.useCallback(() => {
		setTick((tick) => tick + 1);
	}, []);
	return update;
}
