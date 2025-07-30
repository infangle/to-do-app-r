import React, {useState, useEffect} from "react";


function App (){

  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [lastDeletedTask, setLastDeletedTask] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks){
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    if (task.trim() === ""){
      setError("Task can not be Empty");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    }
    setTasks([...tasks, newTask]);  
    setError("");
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
  }

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setLastDeletedTask(taskToDelete);
    setTasks(tasks.filter(task => task.id !== id));
    setShowUndoToast(true);
    setTimeout(() =>{
      setShowUndoToast(false);
      setLastDeletedTask(null);
    }, 5000)
  }

  const undoDelete = () =>{
    if (lastDeletedTask){
      setTasks ([...tasks, lastDeletedTask]);
      setLastDeletedTask(null);
      setShowUndoToast(false);
    }
  }

  return (
    <div className="App">
      <h1 className="title"> To-do list</h1>
      <form className='to-do-form'onSubmit={handleSubmit}>
        <input type="text" className="task-input" valu={task}onChange={(e) => setTask(e.target.value)}placeholder="Input task here"/>
        {error && <p className="error-msg" style={{color: "red"}}>{error}</p>}
          <button type="submit" className="add-task-btn">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task)=>(
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
            {task.text} 
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
              </li>
        ))}
      </ul>
{showUndoToast && (
        <div className="undo-toast">
          <p>Task deleted</p>
          <button onClick={undoDelete}className="undo-btn">Undo</button>
        </div>
      )}

      </div>
  );
}

export default App;