import React, { useState } from "react";
import "./App.css";

function App() {
	//list of todo  items
	const [todoList, setTodoList] = React.useState([]);
	//individual todo text
	const [todoText, setTodoText] = React.useState("");

	const [todoToEdit, setTodoToEdit] = React.useState(null);

	const [editedText, setEditedText] = React.useState("");

	const [tempEditedText, setTempEditedText] = React.useState("");

	function addTodo(s) {
		s.preventDefault();
		if (todoText !== "") {
			const newTodoItem = {
				id: Math.floor(Math.random() * 10000),
				text: todoText,
				completed: false,
			};
			const updatedTodoList = [...todoList].concat(newTodoItem);
			setTodoList(updatedTodoList);
			setTodoText("");
		}
	}

	function deleteTodo(id) {
		const updatedTodoList = [...todoList].filter((item) => {
			if (item.id != id) {
				return item;
			}
		});
		setTodoList(updatedTodoList);
	}

	function beginEditing(id) {
		setTodoToEdit(id);
	}

	function submitEdit(id) {
		const updatedTodos = [...todoList].map((item) => {
			if (item.id === id) {
				item.text = editedText;
			}
			return item;
		});
		setTodoList(updatedTodos);
		setTodoToEdit(null);
		setEditedText("");
	}

	return (
		<div className="App">
			<nav className="navbar">
				<h1>ToDo App</h1>
			</nav>
			<form
				className="form-body"
				onSubmit={(s) => {
					addTodo(s);
				}}>
				<input
					className="input-box"
					type="text"
					placeholder="Type a ToDo item"
					value={todoText}
					onChange={(e) => {
						setTodoText(e.target.value);
					}}
				/>
				<button className="add-button">Add a ToDo</button>
			</form>

			{/*Todo Item map list*/}
			{todoList.map((item) => {
				return (
					<div>
						{todoToEdit == item.id ? (
							//EDITING MODE
							<div className="edit-container">
								<input
									type="text"
									value={editedText}
									onChange={(e) => {
										setEditedText(e.target.value);
									}}
								/>
								<div className="right-action-buttons">
									<button
										className="cancel-button"
										onClick={() => {
											setTodoToEdit(null);
										}}>
										Cancel Edit
									</button>
									<button
										className="submit-button"
										onClick={() => {
											submitEdit(item.id);
										}}>
										Submit Edit
									</button>
								</div>
							</div>
						) : (
							//NON EDITING MODE
							<div className="todo-container">
								<input type="checkbox" />
								<div>{item.text}</div>
								<div className="right-action-buttons">
									<button className="edit-button" onClick={() => beginEditing(item.id)}>
										Edit
									</button>

									<button
										className="delete-button"
										onClick={() => {
											deleteTodo(item.id);
										}}>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default App;
