import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";

function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector((s) => s.todos.addNewTodoLoading);

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();
    await dispatch(addTodoAsync({ title })); //title bir prop gibi yollamamizin sebebi scale(olculebilir) bir sistem tasarlamak icin. yani payload tek bir parametre olarak gitsin onun altina baska obje olarak gidebilir
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={isLoading}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {isLoading && <Loading />}
    </form>
  );
}

export default Form;
