import { useState, useEffect } from "react";
import "./TodoApp.css"; // Import CSS file

function TodoApp() {

// save list in localstorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // state for each input task
  const [task, setTask] = useState("");

  // if any changes then once update
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  // (Optional) 2 tabs are open , if any one tab updates it's data then other will automaticaly update data.   
  useEffect(() => {
    const syncTodos = (e) => {
      if (e.key === "todos") {
        setTodos(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", syncTodos);
    return () => window.removeEventListener("storage", syncTodos);
  }, []);


  // add items 
  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // delete items using id
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // toggle if completed or not
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // clear all list or task in todos
  const clearAll = () => {
    setTodos([]);
  };

  // count the remaining task
  const remaining = todos.filter(todo => !todo.completed).length;

  // jsx | To show
  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">To-Do-List App</h1>

        <div className="input-group">
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Enter a task..."
          />
          <button className="btn add-btn" onClick={addTodo}>Add</button>
          <button className="btn clear-btn" onClick={clearAll}>Clear All</button>
        </div>

        <p className="remaining"> Remaining Tasks:  {remaining} </p>

        <ul className="todo-list">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTodo(todo.id)} className="todo-text">
                {todo.text}
              </span>
              <button className="btn delete-btn" onClick={() => deleteTodo(todo.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
     
        <h6>By Mansoon Mohanty</h6>
      </div>

      
    </div>
  );
}

export default TodoApp;
