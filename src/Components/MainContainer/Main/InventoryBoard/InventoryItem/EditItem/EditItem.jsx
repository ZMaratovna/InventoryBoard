import React from 'react';
import { updateEquipment } from '../../../../../../Firebase';
import s from './EditItem.module.scss';
const EditItem = ({ item, setEditMode }) => {
	const [quantity, setQuantity] = React.useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			id: item.id,
			count: quantity,
		};
		updateEquipment(data);
		setEditMode(false);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit}>
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

export default EditItem;
