import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {


	const [task, setTask] = useState(null);

	const updateTask = (key, value) => {
		const newTask = {
			...task,
			[key]: value
		};
		setTask(newTask);
	}


	const [activity, setActivity] = useState([])

	const addActivity = () => {
		if (!task || !task.action) {
			alert('Complete the task')
			return
		}
		const newActivity = [
			...activity,
			task
		]
		setActivity(newActivity);
		setTask(null)
	}


	const deleteActivity = (index) => {
		const newActivity = activity.filter((_, i) => i !== index);
		setActivity(newActivity);
	};

	return (
		<div className="text-center fs-4">

			<h1 className="text-center mt-5">Aplicación de Todolist usando React y Fetch</h1>


			<input type="text" name="action" placeholder="Write the task"
				value={task ? task.action : ''}
				onChange={(evt) => updateTask('action', evt.target.value)}
			/>
			<div className="btn btn-warning"
				onClick={() => addActivity()}>
				Add Task
			</div>

			<div className="container">
			<hr />
				{
					activity.map((item, index) => (
						<div className="d-flex justify-content-between gap-3">
							<div className="d-flex flex-grow-1 justify-content-between">

								<p>Task: {item.action}</p>

							</div>


							<div
								className="btn btn-danger ms-3"
								onClick={() => deleteActivity(index)}>
								X
							</div>

						</div>

					))
				}

				<hr />
				<div className="btn btn-success">Button Reset</div>
			</div>


		</div>
	);
};

export default Home;