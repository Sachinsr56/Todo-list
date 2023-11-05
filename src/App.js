import React, { useState, useContext, useEffect } from 'react';
import './App.css';

const TaskContext = React.createContext();

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <TaskContext.Provider value={{ tasks, addTask, completeTask, removeTask }}>
        <h1 className="text-center my-4">To-Do List</h1>
        <TaskForm />
        <TaskList />
      </TaskContext.Provider>
    </div>
  );
}

function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      addTask({ text: task, completed: false });
      setTask('');
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}

function TaskList() {
  const { tasks, completeTask, removeTask } = useContext(TaskContext);

  const handleComplete = (index) => {
    completeTask(index);
  };

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <li key={index} className={`list-group-item ${task.completed ? 'completed' : ''}`}>
          {task.text}
          <div className="float-right">
            <button className="btn btn-success mr-2" onClick={() => handleComplete(index)}>
              Complete
            </button>
            <button className="btn btn-danger" onClick={() => removeTask(index)}>
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}


export default App;
