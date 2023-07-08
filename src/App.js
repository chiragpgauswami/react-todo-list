import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlusSquare,
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          checked: false,
        },
      ]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    setTodo("");
  };

  const handleDeleteTodo = (e, id) => {
    console.log(e);
    const item = e.target;
    const todo = item.parentElement;

    // delete todo
    if (item.classList[0] === "trash-btn") {
      todo.classList.add("fall");
      todo.addEventListener("animationend", () => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(todos));
      });
    }
  };

  const handleCheckTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.checked = !todo.checked;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const filterTodo = (e) => {
    const value = e.target.value;
    switch (value) {
      case "all":
        setTodos(JSON.parse(localStorage.getItem("todos")));
        break;
      case "completed":
        setTodos(
          JSON.parse(localStorage.getItem("todos")).filter(
            (todo) => todo.checked === true
          )
        );
        break;
      case "uncompleted":
        setTodos(
          JSON.parse(localStorage.getItem("todos")).filter(
            (todo) => todo.checked === false
          )
        );
        break;
      default:
        return;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TODO List</h1>
      </header>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todo-input"
          maxLength="40"
          value={todo}
          onChange={handleInputChange}
        />
        <button className="todo-button" type="submit">
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={filterTodo}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <div
              className={`todo ${todo.checked ? "completed" : ""}`}
              key={todo.id}
            >
              <li className="todo-item">{todo.text}</li>
              <button
                className="check-btn"
                onClick={() => handleCheckTodo(todo.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="trash-btn"
                onClick={(e) => handleDeleteTodo(e, todo.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
