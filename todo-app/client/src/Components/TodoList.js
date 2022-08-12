import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  removeItemAsync,
  selectFilteredTodos,
  getTodoAsync,
  toggleTodoAsync,
} from "../redux/todos/todosSlice";

import Loading from "./Loading";
import Error from "./Error";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((s) => s.todos.isLoading);
  const error = useSelector((s) => s.todos.error);

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  const toggleTodo = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  const removeItem = async (id) => {
    await dispatch(removeItemAsync({ id }));
  };
  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : null}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => toggleTodo(item.id, !item.completed)}
              checked={item.completed}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => removeItem(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
