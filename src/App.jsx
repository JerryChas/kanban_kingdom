import React, { useState } from 'react';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import './App.css';
import Layout from './components/Layout/Layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
	const [modalTask, setModalTask] = useState(null); // Store the task data for the modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalIds, setModalIds] = useState({
		boardId: '',
		columnId: '',
		storyId: '',
	});

	// Handle the modal on task
	const handleOpenModal = (taskId, taskData, ids) => {
		setModalTask(taskData);
		setModalIds(ids); // Here, `ids` should be an object containing actual IDs
		setIsModalOpen(true);
	};

	// Handle close modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setModalTask(null); // Reset the task ID for the modal
	};

	return (
		<div className="bgPic">
			<DndProvider backend={HTML5Backend}>
				<Header />
				{isModalOpen && (
					<Modal task={modalTask} onClose={handleCloseModal} ids={modalIds} />
				)}
				<Layout handleOpenModal={handleOpenModal} />
			</DndProvider>
		</div>
	);
}

export default App;
