import { defineStore } from "pinia";
import { nanoid } from "nanoid";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todoList: localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [
          { id: nanoid(10), title: "Learn React JS", complete: false },
          { id: nanoid(10), title: "Learn Vue JS", complete: true },
          { id: nanoid(10), title: "Learn JS", complete: false },
        ],
    inputError: "hidden",
    filter: "all",
    todoEditId: null,
    todoInput: "",
  }),

  actions: {
    handleTodoCreate() {
      if (!this.todoInput) {
        this.inputError = "visible";
        return;
      } else {
        this.inputError = "hidden";
      }

      if (this.todoEditId) {
        this.todoList = this.todoList.map((todo) =>
          todo.id === this.todoEditId
            ? { ...todo, title: this.todoInput }
            : todo
        );
        this.todoInput = "";
        this.todoEditId = null;
      } else {
        const todo = {
          id: nanoid(10),
          title: this.todoInput,
          complete: false,
        };
        this.todoList.unshift(todo);
        this.todoInput = "";
      }
    },

    handleTodoEdit(todoId) {
      this.todoEditId = todoId;
      const editTodo = this.todoList.find((item) => item.id === todoId);
      this.todoInput = editTodo.title;
    },

    handleTodoComplete(todoId) {
      this.todoList = this.todoList.map((item) =>
        item.id === todoId ? { ...item, complete: !item.complete } : item
      );
    },

    handleTodoDelete(todoId) {
      this.todoList = this.todoList.filter((item) => item.id !== todoId);
    },
  },

  getters: {
    handleFilteredTodoList() {
      const updatedTodoList = this.todoList.filter((todo) => {
        if (this.filter === "complete") {
          return todo.complete;
        } else if (this.filter === "incomplete") {
          return !todo.complete;
        }
        return true;
      });

      return updatedTodoList;
    },

    todoListLength() {
      return {
        all: this.todoList.length,
        complete: this.todoList.filter((item) => item.complete).length,
        incomplete: this.todoList.filter((item) => !item.complete).length,
      };
    },
  },
});
