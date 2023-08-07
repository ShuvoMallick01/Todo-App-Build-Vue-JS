<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- TODO FORM -->
      <TodoCreateForm
        @create="handleTodoCreate($event)"
        :todoEditInputTitle="todoEditInputTitle"
      />
      <p class="mt-2 text-red-500 text-sm" :class="inputError">
        Input filed required!
      </p>

      <!-- FILTER ACTION -->
      <TodoFilterAction
        :todoListLength="todoListLength"
        @filterEvent="handleChangeFilter($event)"
        :filter="filter"
      />

      <!-- TODO LIST -->
      <TodoList
        :todoList="handleFilteredTodoList"
        @complete="handleTodoComplete($event)"
        @delete="handleTodoDelete($event)"
        @editTodo="handleTodoEditTitle($event)"
      />
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
      todoEditInputTitle: "",
      todoEditId: "",
    };
  },

  methods: {
    handleTodoCreate(title) {
      if (!title) {
        this.inputError = "visible";
        return;
      } else {
        this.inputError = "hidden";
      }

      if (this.todoEditId !== "") {
        this.todoList = this.todoList.map((item) =>
          item.id === this.todoEditId ? { ...item, title: title } : item
        );
        this.todoEditInputTitle = "";
      } else {
        const todo = {
          id: nanoid(10),
          title: title,
          complete: false,
        };
        this.todoList.unshift(todo);
      }
    },

    handleTodoComplete(todoId) {
      this.todoList = this.todoList.map((item) =>
        item.id === todoId ? { ...item, complete: !item.complete } : item
      );
    },

    handleTodoDelete(todoId) {
      this.todoList = this.todoList.filter((item) => item.id !== todoId);
    },

    handleChangeFilter(filterValue) {
      this.filter = filterValue;
    },

    handleTodoEditTitle(todoEditId) {
      this.todoEditId = todoEditId;
      const editTodo = this.todoList.find((item) => item.id === todoEditId);
      this.todoEditInputTitle = editTodo.title;
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
};
</script>
