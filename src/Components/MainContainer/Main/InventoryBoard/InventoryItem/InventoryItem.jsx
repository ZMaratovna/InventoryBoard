import React from 'react';
import { removeEquipment } from '../../../../../Firebase';

import EditItem from './EditItem/EditItem';
import s from './InventoryItem.module.scss';

const InventoryItem = ({ item, childNodes }) => {
	const [editMode, setEditMode] = React.useState(false);

	const handleDelete = () => {
		removeEquipment(item.id);
	};
	const handleEdit = () => {
		setEditMode(true);
	};
	return (
		<li className={s.item} key={item.id}>
			<span>
				{item.data.name} &nbsp;<strong>{item.data.count}</strong>
			</span>

			{childNodes.length === 1 && !editMode && (
				<span className={s.btnContainer}>
					<button onClick={handleDelete}>Delete</button>
					<button onClick={handleEdit}>Edit</button>
				</span>
			)}
			{editMode && <EditItem setEditMode={setEditMode} item={item} />}
		</li>
	);
};

export default InventoryItem;
