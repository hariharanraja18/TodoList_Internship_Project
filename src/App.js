import { useState } from 'react';

function App() {
	const [task, setTask] = useState('');
	const [taskList, setTaskList] = useState([]);
	const [editing, setEditing] = useState(false);
	const [currentTask, setCurrentTask] = useState({});
	const [filter, setFilter] = useState('all');

	const handleDelete = (id) => {
		let newTaskList = taskList.filter((oldTask) => {
			return oldTask.id !== id;
		});
		setTaskList(newTaskList);
	};

	const handleEdit = (task) => {
		setEditing(true);
		setCurrentTask(task);
		setTask(task.taskName);
	};

	const handleUpdate = () => {
		let newTaskList = taskList.map((oldTask) => {
			if (oldTask.id === currentTask.id) {
				return { ...oldTask, taskName: task };
			}
			return oldTask;
		});
		setTaskList(newTaskList);
		setEditing(false);
		setTask('');
	};

	const handleComplete = (task) => {
		let newTaskList = taskList.map((oldTask) => {
			if (oldTask.id === task.id) {
				return { ...oldTask, completed: !oldTask.completed };
			}
			return oldTask;
		});
		setTaskList(newTaskList);
	};

	const filteredTaskList = taskList.filter((task) => {
		if (filter === 'completed') return task.completed;
		if (filter === 'incomplete') return !task.completed;
		return true; 
	});

	return (
		<div className="container mx-auto p-4 md:p-6 lg:p-8">
			<div className="flex justify-center mb-4">
				<h1 className="text-3xl font-bold text-blue-900">TODO LIST</h1>
			</div>
			<div className="flex justify-center mb-4">
				<input
					type="text"
					className="w-1/2 p-2 pl-10 text-md text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					placeholder="Enter task..."
				/>
				<button
					className="ml-2 w-1/4 p-2 text-md text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
					onClick={() => {
						if (editing) {
							handleUpdate();
						} else {
							let newTask = {
								id:
									taskList.length === 0
										? 1
										: taskList[taskList.length - 1].id + 1,
								taskName: task,
								completed: false,
							};
							setTaskList([...taskList, newTask]);
							setTask('');
						}
					}}>
					{editing ? 'Update' : 'Add'}
				</button>
			</div>

			<div className="flex justify-center mb-4">
				<button
					className={`px-4 py-2 mx-2 text-sm text-white border rounded-lg ${
						filter === 'all' ? 'bg-blue-600' : 'bg-gray-400'
					}`}
					onClick={() => setFilter('all')}>
					All
				</button>
				<button
					className={`px-4 py-2 mx-2 text-sm text-white border rounded-lg ${
						filter === 'completed' ? 'bg-blue-600' : 'bg-gray-400'
					}`}
					onClick={() => setFilter('completed')}>
					Completed
				</button>
				<button
					className={`px-4 py-2 mx-2 text-sm text-white border rounded-lg ${
						filter === 'incomplete' ? 'bg-blue-600' : 'bg-gray-400'
					}`}
					onClick={() => setFilter('incomplete')}>
					Incomplete
				</button>
			</div>

			<div className="w-full">
				{filteredTaskList.length === 0 ? (
					<div className="text-center text-gray-500">No tasks to show</div>
				) : (
					filteredTaskList.map((task) => {
						return (
							<div
								key={task.id}
								className="flex justify-between items-center mb-2 p-4 border border-gray-200 rounded-lg shadow-sm relative">
								<h1
									className={`text-lg text-gray-600 ${
										task.completed ? 'line-through' : ''
									}`}>
									{task.taskName}
								</h1>
								<div className="absolute right-4 top-4 flex">
									<button
										className="px-4 py-2 text-sm text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
										onClick={() => handleComplete(task)}>
										{task.completed ? 'Incomplete' : 'Mark as Complete'}
									</button>
									<button
										className="ml-2 px-4 py-2 text-sm text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
										onClick={() => handleEdit(task)}>
										Edit
									</button>
									<button
										className="ml-2 px-4 py-2 text-sm text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
										onClick={() => handleDelete(task.id)}>
										Delete
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

export default App;
