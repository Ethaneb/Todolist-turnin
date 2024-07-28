import React, { useState } from 'react';


// Create function with no parameters
function TodoList() {
    // Declare state variables
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]);

    // Set the list values
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Add a new todo to the list
    const handleAddTodo = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    // Edit the todo list at the index
    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditingValue(todos[index]);
    };

    // Change the value of the todo list
    const handleEditChange = (e) => {
        setEditingValue(e.target.value);
    };

    // Submit the edit of the todo list
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedTodos = [...todos];
        updatedTodos[editingIndex] = editingValue;
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditingValue('');
    };

    // Add item to the completed list
    const handleCompleteClick = (index) => {
        setCompletedTodos((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    };

    // Delete a item at index from the list
    const handleDeleteClick = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
        setCompletedTodos(completedTodos.filter((i) => i !== index));
    };

    return (
    <div>
        <h2>Todo List</h2>
        {/* Create a form to add a new task */}
        <form onSubmit={handleAddTodo}>
        <input
            className="main-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a new task" 
            />
        <button className="main-submit"type="submit">Add task</button>
        </form>
        {/* Create a list of tasks */}
        <ul>
        {/* Map over the todos array and create a list item for each item */}
        {todos.map((todo, index) => (
            <li key={index}>
                {/* Create a span element for each todo item */}
                <span
                    className={`list-item ${completedTodos.includes(index) ? 'completed' : 'incomplete'}`}
                    onClick={() => handleCompleteClick(index)}
                    style={{
                        textDecoration: completedTodos.includes(index) ? 'line-through' : 'none',
                        cursor: 'pointer',
                    }}
                    >
                    {editingIndex === index ? (
                        <form
                            onSubmit={handleEditSubmit}
                            style={{ display: 'inline' }}
                            onClick={(e) => e.stopPropagation()} 
                            >
                            <input
                                type="text"
                                className="edit-input"
                                value={editingValue}
                                onChange={handleEditChange}
                                onClick={(e) => e.stopPropagation()} 
                                />
                            <button type="submit" className="edit-submit" onClick={(e) => e.stopPropagation()}>Save</button>
                        </form>
                    ) : (
                        todo
                    )}
                </span>
                {editingIndex !== index && (
                    <>
                        <button className="list-button edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                        <button className="list-button delete-button" onClick={() => handleDeleteClick(index)}>Delete</button>
                    </>
                )}
            </li>
        ))}
        </ul>
    </div>
    );
}

export default TodoList;