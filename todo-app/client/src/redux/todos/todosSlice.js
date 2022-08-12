import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//name, initial state ve reducer tanimlarini burda veriyoruz

export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  const res = await fetch("http://localhost:7000/todos");
  return await res.json();
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const res = await axios.post("http://localhost:7000/todos", data);
    return await res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data);
    return await res.data;
  }
);

export const removeItemAsync = createAsyncThunk(
  "todos/removeItemAsync",
  async ({ id }) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);
    return id;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },
    // toggle: (state, action) => {
    //   const { id } = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   item.completed = !item.completed;
    // },
    // destroy: (state, action) => {
    //   const id = action.payload;
    //   const filtered = state.items.filter((item) => item.id !== id);
    //   state.items = filtered;
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state, action) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    //getTodo

    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    //addTodo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },

    //toggleTodo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },

    //removeItemAsync

    [removeItemAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
  },
});

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  } else {
    return state.todos.items.filter((todo) =>
      state.todos.activeFilter === "active"
        ? todo.completed === false
        : todo.completed === true
    );
  }
};

export const selectTodos = (s) => s.todos.items;

export const { changeActiveFilter, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
