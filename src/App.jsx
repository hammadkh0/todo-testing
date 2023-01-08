import "./App.css";
import Form from "./Form";
import Todo from "./Todo";
import { useState } from "react";
import shortid from "shortid";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todosToShow, setTodosToShow] = useState("all");

  const toggleComplete = (i) =>
    setTodos(
      todos.map((todo, k) =>
        k === i
          ? {
              ...todo,
              complete: !todo.complete,
            }
          : todo
      )
    );
  const updateTodosToShow = (todoState) => {
    setTodosToShow(todoState);
  };
  const handleDelete = (i) => {
    setTodos(todos.filter((todo, k) => i !== k));
  };

  let TODOS = [];
  if (todosToShow === "all") {
    console.log(todos);
    TODOS = todos;
  } else if (todosToShow === "active") {
    TODOS = todos.filter((todo) => !todo.complete);
  } else if (todosToShow === "complete") {
    TODOS = todos.filter((todo) => todo.complete);
    console.log(TODOS);
  }

  return (
    <div className="App">
      <Form
        onSubmit={(text) => setTodos([{ text, complete: false, id: shortid.generate() }, ...todos])}
      />
      <div className="todo-items">
        {TODOS.map(({ text, complete, id }, i) => (
          <Todo
            key={id}
            complete={complete}
            toggleComplete={() => toggleComplete(i)}
            id={i}
            onDelete={() => handleDelete(i)}
            text={text}
          />
        ))}
      </div>
      <button onClick={() => updateTodosToShow("all")}>View All</button>
      <button onClick={() => updateTodosToShow("active")}>View Active</button>
      <button onClick={() => updateTodosToShow("complete")}>View Completed</button>
    </div>
  );
};
export default App;
