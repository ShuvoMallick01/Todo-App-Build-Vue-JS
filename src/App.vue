<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- TODO FORM -->
      <TodoCreateForm v-model="todoInput" />
      <p class="mt-2 text-red-500 text-sm" :class="inputError">
        Input filed required!
      </p>

      <!-- FILTER ACTION -->
      <TodoFilterAction
        v-model:filter="filter"
        :todoListLength="todoListLength"
      />

      <!-- TODO LIST -->
      <TodoList :todoList="handleFilteredTodoList" />
    </section>
  </section>
</template>

<!-- FUNTIONALITY -->
<script>
import TodoCreateForm from "./components/TodoCreateForm.vue";
import TodoFilterAction from "./components/TodoFilterAction.vue";
import TodoList from "./components/TodoList.vue";
// Input Plugin
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      todoList: localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [
            { id: nanoid(10), title: "Learn React JS", complete: false },
            { id: nanoid(10), title: "Learn Vue JS", complete: true },
            { id: nanoid(10), title: "Learn JS", complete: false },
          ],
      inputError: "hidden",
      filter: "all",
      todoInput: "",
      todoEditId: "",
    };
  },

  methods: {
    handleTodoCreate() {
      console.log(this.todoInput);
      if (!this.todoInput) {
        this.inputError = "visible";
        return;
      } else {
        this.inputError = "hidden";
      }

      if (this.todoEditId) {
        this.todoList = this.todoList.map((item) =>
          item.id === this.todoEditId
            ? { ...item, title: this.todoInput }
            : item
        );
        this.todoEditId = "";
      } else {
        const todo = {
          id: nanoid(10),
          title: this.todoInput,
          complete: false,
        };
        this.todoList.unshift(todo);
      }

      this.todoInput = "";
    },

    handleTodoComplete(todoId) {
      this.todoList = this.todoList.map((item) =>
        item.id === todoId ? { ...item, complete: !item.complete } : item
      );
    },

    handleTodoDelete(todoId) {
      this.todoList = this.todoList.filter((item) => item.id !== todoId);
    },

    handleTodoEdit(todoEditId) {
      console.log(todoEditId);
      this.todoEditId = todoEditId;
      const editTodo = this.todoList.find((item) => item.id === todoEditId);
      this.todoInput = editTodo.title;
    },
  },

  computed: {
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

  watch: {
    todoList: {
      handler: (newValue) => {
        localStorage.setItem("todos", JSON.stringify(newValue));
      },
      deep: true,
    },
  },

  components: {
    TodoCreateForm,
    TodoFilterAction,
    TodoList,
  },

  provide() {
    return {
      handleTodoCreate: this.handleTodoCreate,
      handleTodoComplete: this.handleTodoComplete,
      handleTodoDelete: this.handleTodoDelete,
      handleTodoEditTitle: this.handleTodoEdit,
    };
  },
};
</script>
