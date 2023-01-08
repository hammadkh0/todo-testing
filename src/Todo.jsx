import React from "react";
const Todo = (props) => (
  <div
    id={"todo-" + props.id}
    className="todo"
    style={{ display: "flex", justifyContent: "center" }}
  >
    <div
      className="todo-text"
      style={{
        textDecoration: props.complete ? "line-through" : "",
      }}
      onClick={props.toggleComplete}
    >
      {props.text}
    </div>
    <button className="delete" onClick={props.onDelete}>
      x
    </button>
  </div>
);

export default Todo;
