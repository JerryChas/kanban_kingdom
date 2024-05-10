import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../slices/UserSlice';
import css from './UserSelector.module.css';

function UserSelector() {
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const selectedUser = useSelector((state) => state.selectedUser); // Access selected user from Redux store
	const dispatch = useDispatch();

	// Function to handle change of selected user in header
	const handleChange = (event) => {
		const selectedValue = event.target.value;
		dispatch(setSelectedUser(selectedValue)); // Dispatch setSelectedUser action with selectedValue
	};

	return (
		<select className={css.select} onChange={handleChange} value={selectedUser}>
			<option value="">Välj användare</option>
			{users.map((user) => (
				<option key={user.id} value={user.id}>
					{user.name}
				</option>
			))}
		</select>
	);
}

export default UserSelector;
