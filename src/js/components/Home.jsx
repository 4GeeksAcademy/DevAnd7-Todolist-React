import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {

	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/DevAnd7')
			.then(response => {
				return response.json();
			})
			.then(data => {
				setActivity([...data.todos])
				console.log(data)
			})
			.catch(error => {
				console.log('Oh No! There was a problem: \n', error);
			});

	}, []);

	//POST
	const createPost = (task) => {

		fetch('https://playground.4geeks.com/todo/todos/DevAnd7', {
			method: 'POST',
			body: JSON.stringify({
				label: task.label,
				is_done: false
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		}).then((response) => response.json())
	}


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
		if (!task || !task.label) {
			alert('Complete the task')
			return
		}
		const newActivity = [
			...activity,
			task
		]
		createPost(task)
		setActivity(newActivity);
		setTask(null)
	}

	//DELETE

	const deleteActivity = (index) => {
		const deleteTask = activity[index]

		const newActivity = activity.filter((_, i) => i !== index);
		setActivity(newActivity);
		eraseTask(deleteTask.id)
	};

	const eraseTask = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,
			{
				method: 'DELETE'
			}
		).then((response) => response.json())
	}


	const resetList = () => {
		activity.forEach((tarea) => {
			eraseTask(tarea.id)
		}
		); setActivity([])
	}




	return (
		<div className="text-center fs-4">

			<h1 className="text-center mt-5">Aplicación de Todolist usando React y Fetch</h1>


			<input type="text" name="label" placeholder="Write the task"
				value={task ? task.label : ''}
				onChange={(evt) => updateTask('label', evt.target.value)}
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

								<p>Task: {item.label}</p>

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
				<div className="btn btn-success" onClick={() => resetList()}>
					Button Reset
				</div>
			</div>

		</div>
	);
};

export default Home;