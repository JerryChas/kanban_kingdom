import { useSelector } from 'react-redux';
import css from './Task.module.css';
import { DiUbuntu } from 'react-icons/di';

const Task = ({
	task,
	handleOpenModal,
	boardId,
	columnId,
	storyId,
	selectedOption,
}) => {
	const ids = { boardId, columnId, storyId };
	const selectedUser = useSelector((state) => state.users.selectedUser);

	const handleClick = () => {
		// Pass the task ID to the handleOpenModal function
		handleOpenModal(task.id, task, ids);
	};

	// Hämta användarna från LocalStorage
	const users = JSON.parse(localStorage.getItem('users')) || [];

	// console.log(users);

	// const filteredUserTasks = selectedUser
	// 	? task.userOwnership.includes(selectedUser)
	// 	: true;
	const filteredUserTasks =
		!selectedUser || task.userOwnership.includes(selectedUser);

	return (
		<>
			{filteredUserTasks && (
				<div
					onClick={handleClick}
					className={css.task}
					style={{
						padding: '5px',
						border:
							(task.isCompleted && 'rgb(112, 255, 117) solid 2px') ||
							(task.isUrgent && 'rgb(255, 255, 102) solid 2px'),
					}}
				>
					<div className="taskheader">
						<h5>{task.title}</h5>
						<hr />
					</div>
					{task.dueDate && (
						<p
							style={{
								fontSize: '0.6rem',
								color: 'white',
								paddingTop: '0.5em',
							}}
						>
							Do date: {task.dueDate}
						</p>
					)}
					<div
						style={{ fontSize: '0.8rem', color: 'white', paddingTop: '0.3em' }}
					>
						<div style={{ display: 'flex', gap: '3px' }}>
							{users.map((user) =>
								task.userOwnership.map(
									(ownership) =>
										ownership === user.id && (
											<span key={user.id}>
												<img
													key={user.id}
													src={user.profilePhoto}
													style={{
														width: '32px',
														height: '30px',
														borderRadius: '50%',
														marginRight: '0.5rem',
													}}
												/>
												<p
													style={{
														width: '32px',
														overflow: 'hidden',
														color: 'yellow',
													}}
												>
													{user.name}
												</p>
											</span>
										)
								)
							)}
						</div>
					</div>
					{/* <p style={{ fontSize: '0.8rem', color: 'white', paddingTop: '0.3em' }}>
					{task.userOwnership.join(', ')}
				</p> */}
					<div className={css.userPhotos}></div>
				</div>
			)}
		</>
	);
};

export default Task;
