import React from 'react';
import { addEquipment } from '../../../../../Firebase';
import s from './InventoryForm.module.scss';
const InventoryForm = ({ location, setOnCreate, forceUpdate }) => {
	const [newInventory, setNewInventory] = React.useState('');
	const [quantity, setQuantity] = React.useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { name: newInventory, count: quantity, placeId: location };
		addEquipment(data);
		setOnCreate(false);
		forceUpdate();
	};
	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<label htmlFor='name'>
				Наименование
				<input
					id='name'
					value={newInventory}
					onChange={(e) => setNewInventory(e.target.value)}
				/>
			</label>
			<label htmlFor='count'>
				Количество
				<input
					id='count'
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
			</label>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default InventoryForm;
