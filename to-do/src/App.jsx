import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [lastDeletedTask, setLastDeletedTask] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // New flag to track load completion

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log("Initial load - localStorage tasks:", storedTasks);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Error parsing localStorage tasks:", e);
      }
    }
    setIsLoaded(true); // Mark load as complete
  }, []);

  useEffect(() => {
    if (isLoaded) { // Only save after initial load
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    const newTask = { id: Date.now(), text: task.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setError("");
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setLastDeletedTask(taskToDelete);
    setTasks(tasks.filter(task => task.id !== id));
    setShowUndoToast(true);
    const timeoutId = setTimeout(() => {
      setShowUndoToast(false);
      setLastDeletedTask(null);
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  const undoDelete = () => {
    if (lastDeletedTask) {
      setTasks([...tasks, lastDeletedTask].sort((a, b) => a.id - b.id));
      setLastDeletedTask(null);
      setShowUndoToast(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = (id) => {
    if (editedText.trim() === "") {
      setError("Edited task cannot be empty");
      return;
    }
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editedText } : task)));
    setEditingTaskId(null);
    setEditedText("");
    setError("");
  };

  return (
    <div className="App">
      <h2 className="title">To-do list</h2>
      <form className="to-do-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Input task here"
        />
        {error && <p className="error-msg" style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="add-btn">Add</button>
      </form>

      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          {editingTaskId === task.id ? (
            <>
              <input
                className="task-input"
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(task.id)} className="save-btn">Save</button>
              <button onClick={() => setEditingTaskId(null)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.completed ? <s>{task.text}</s> : task.text}
              <button onClick={() => handleEdit(task)} className="edit-btn">Edit</button>
            </>
          )}
          <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
        </div>
      ))}

      {showUndoToast && (
        <div className="undo-toast">
          <p>Task deleted</p>
          <button onClick={undoDelete} className="undo-btn">Undo</button>
        </div>
      )}
    </div>
  );
}

export default App;