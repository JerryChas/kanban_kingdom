import Story from '../Story/Story';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addStory, moveStory, removeStory } from '../../slices/BoardSlice';
import { useDrop } from 'react-dnd';
import css from './Column.module.css';
import DeleteButton from '../DeleteButton';

const Column = ({
	stories,
	column,
	board,
	handleOpenModal,
	onDeleteColumn,
}) => {
	const columnRef = useRef(column);
	const boardId = board.id;

	// function to handle moving stories inside column
	const handleMoveStory = (storyId, columnId) => {
		dispatch(moveStory({ storyId, columnId, boardId }));
		// console.log("Dropped into column:", columnRef.current.title);
	};

	// drop stories in right target
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'story',
		drop: (story) => handleMoveStory(story.id, column.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const [input, setInput] = useState('');
	const dispatch = useDispatch();

	// function to add story
	const handleAddStory = (e) => {
		e.preventDefault();

		const columnId = column.id;
		const boardId = board.id;

		dispatch(addStory({ title: input, columnId, boardId }));
		setInput('');
	};

	// function to Delete story
	const handleDeleteStory = (story) => {
		console.log('DELETE STORY: ', story.title);

		dispatch(removeStory({ columnId: column.id, storyId: story.id }));
	};

	return (
		<section className={css.column} ref={drop}>
			{/* En form som lägger till stories */}
			<div className={css.column_header}>
				<h3 className={css.column_title}>{column.title}</h3>
				<div className={css.delete_button}>
					<DeleteButton onClick={onDeleteColumn} />
				</div>
			</div>
			<div className={css.column_content}>
				{stories.map((story) => (
					<Story
						key={story.id}
						tasks={story.tasks}
						story={story}
						column={column}
						board={board}
						handleOpenModal={handleOpenModal}
						onDeleteStory={() => handleDeleteStory(story)}
					/>
				))}
			</div>
			<form onSubmit={handleAddStory}>
				<input
					type="text"
					id="storyTitle"
					placeholder="Add a story.."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit" disabled={!input.length}>
					+
				</button>
			</form>
		</section>
	);
};

export default Column;
