import Task from '../Task/Task';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../slices/BoardSlice';
import { useDrag } from 'react-dnd';
import css from './Story.module.css';
import DeleteButton from '../DeleteButton';

const Story = ({
	tasks,
	story,
	column,
	board,
	handleOpenModal,
	columns,
	onDeleteStory,
}) => {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();

	let columnId = null;

	// checks if it's Column.jsx that renders Story (with column as prop)
	if (column) {
		// if column.id is found
		columnId = column.id;
	} else {
		// else render out from ListviewPage.jsx and finds id through the column array
		const storyId = story.id;
		let foundColumnId = null;
		// search through all columns
		columns.forEach((column) => {
			//if story is found in a column === columnId
			if (column.stories.find((s) => s.id === storyId)) {
				// Set the foundColumnId
				foundColumnId = column.id;
			}
		});
		columnId = foundColumnId;
	}

	const boardId = board.id;
	const storyId = story.id;

	// function to drag story
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'story',
		item: { id: story.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	// function for adding a task to a story
	const handleAddTask = (e) => {
		e.preventDefault();
		dispatch(addTask({ title: input, columnId, boardId, storyId }));
		setInput('');
	};

	return (
		<article className={css.story} ref={drag}>
			<h4>{story.title}</h4>
			<div className={css.delete_button}>
				<DeleteButton onClick={onDeleteStory} />
			</div>
			<div className={css.task_div}>
				{tasks.map((task) => (
					<Task
						boardId={boardId}
						columnId={columnId}
						storyId={storyId}
						handleOpenModal={handleOpenModal}
						key={task.id}
						task={task}
					/>
				))}
			</div>
			<form onSubmit={handleAddTask}>
				<input
					type="text"
					id="taskTitle"
					placeholder="Add a task..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit" disabled={!input.length}>
					+
				</button>
			</form>
		</article>
	);
};

export default Story;
