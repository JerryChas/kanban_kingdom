import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Column from '../Column/Column';

import {
	addColumn,
	editBoardName,
	removeColumn,
} from '../../slices/BoardSlice';
import css from './Board.module.css';
import { useParams } from 'react-router-dom';
import { FaTrello, FaStream } from 'react-icons/fa';
import './Listview.css';
import ListPage from './ListPage';
import Crown from './Crown';
import Crown2 from './Crown2';

const Board = ({ handleOpenModal, toggleCollapse, asideIsCollapsed }) => {
	// get the id from the url params
	const { boardId } = useParams();

	// reference input field for board name edit
	const focusBoardNameEdit = useRef(null);

	// get boards from redux store
	const boards = useSelector((state) => state.boards);

	// Find the board using the parsed boardId as a string
	const board = boards.find((board) => board.id === boardId);

	// useState for column input, list view toggle and edit board name

	const [input, setInput] = useState('');

	const [isListview, setIsListview] = useState(false);
	const [isEditingBoardName, setIsEditingBoardName] = useState(false);

	// redux dispatch
	const dispatch = useDispatch();

	// function to toggle list view
	const handleListviewClick = (e) => {
		e.preventDefault();
		setIsListview(!isListview);
		console.log(isListview);
	};

	// function to add column
	const handleAddColumn = (e) => {
		e.preventDefault();
		dispatch(addColumn({ title: input, boardId: board.id }));
		setInput('');
	};

	// function to Delete column
	const handleDeleteColumn = (column) => {
		console.log('DELETE COLUMN: ', column.title);

		dispatch(removeColumn({ boardId: boardId, columnId: column.id }));
	};

	// function to handle board name change
	function handleBoardNameChange(e) {
		dispatch(editBoardName({ boardName: e.target.value, boardId: board.id }));
	}

	// function to handle to toggle board name edit mode
	function handleToggleBoardNameEdit() {
		setIsEditingBoardName((prev) => !prev);
		if (focusBoardNameEdit.current) {
			focusBoardNameEdit.current.focus();
		}
	}

	// listen to key press for board edit
	function handleKeyPress(e) {
		if (e.key === 'Enter') handleToggleBoardNameEdit();
	}

	// handle focus on board name edit input
	useEffect(() => {
		if (focusBoardNameEdit.current) {
			focusBoardNameEdit.current.focus();
		}
	}, [isEditingBoardName]);

	if (!board) {
		// Handle case when board is not found
		return <div style={{ padding: '10px 20px 20px 20px' }}>Loading...</div>;
	}

	return (
		<main className={css.board}>
			{/* <div className={css.board_header}> */}
			<div
				className={`${css.board_header} ${
					asideIsCollapsed ? 'full_width' : ''
				}`}
			>
				<div className={css.left_side}>
					<button
						className="collapse_button no_margin"
						onClick={toggleCollapse}
					>
						{asideIsCollapsed ? <Crown /> : <Crown2 />}
					</button>
					{isEditingBoardName ? (
						<input
							type="text"
							className={css.boardname_edit_input}
							onChange={handleBoardNameChange}
							onKeyDown={handleKeyPress}
							value={board.title}
							ref={focusBoardNameEdit}
						/>
					) : (
						<h2 onClick={handleToggleBoardNameEdit}>{board.title}</h2>
					)}
				</div>
				<form onSubmit={handleAddColumn}>
					<input
						type="text"
						id="columnTitle"
						placeholder="Add a column.."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit" disabled={!input.length}>
						{' '}
						+{' '}
					</button>
				</form>
				<button
					className="listBtn"
					onClick={handleListviewClick}
					// style={{ color: "blue", marginLeft: "2rem" }}
				>
					{!isListview ? (
						<FaTrello style={{ color: 'red' }} />
					) : (
						<FaStream style={{ color: 'blue' }} />
					)}
				</button>
			</div>

			{!isListview ? (
				<div className={css.column_container}>
					{board.columns.map((column) => (
						<Column
							handleOpenModal={handleOpenModal}
							onDeleteColumn={() => handleDeleteColumn(column)}
							key={column.id}
							stories={column.stories}
							board={board}
							columns={board.columns}
							column={column}
						/>
					))}
				</div>
			) : (
				<ListPage board={board} handleOpenModal={handleOpenModal} />
			)}
			{/* <div className={css.column_container}>
        {board.columns.map((column) => (
          <Column
            handleOpenModal={handleOpenModal}
            key={column.id}
            stories={column.stories}
            board={board}
            column={column}
          />
        ))}
      </div> */}
		</main>
	);
};

export default Board;
