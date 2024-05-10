import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import UserSelector from '../UserSelector/UserSelector';
import css from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
	// const selectedUser = useSelector(
	// 	(state) => state.users.find((user) => user.selectedUser)
	// 	// showing the user that is the selected user
	// );
	const selectedUser = useSelector((state) => state.users.selectedUser);

	return (
		<header className={css.header}>
			<div className={css.logoBox}>
				<Link to={'/'} className="route_link">
					{' '}
					<p
						style={{
							fontFamily: 'Bangers',
							fontSize: '1.8rem',
							color: '#d67233',
						}}
					>
						KANBAN KINGDOM <br /> MALMÖ MARVELS
					</p>
				</Link>
			</div>
			<NavBar />
			<div className={css.userBox}>
				<p>Logged in as:</p>
				<UserSelector />
			</div>
		</header>
	);
};

export default Header;
