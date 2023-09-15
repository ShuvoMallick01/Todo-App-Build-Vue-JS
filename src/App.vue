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
      <div v-if="loading">
        <div
          v-for="no in 4"
          :key="no"
          class="border border-slate-600 shadow rounded-md p-3 max-w-md w-full mx-auto"
        >
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-4 bg-slate-700 rounded"></div>
            </div>
            <div class="flex gap-1">
              <div class="rounded-full bg-slate-700 h-6 w-6"></div>
              <div class="rounded-full bg-slate-700 h-6 w-6"></div>
              <div class="rounded-full bg-slate-700 h-6 w-6"></div>
            </div>
          </div>
        </div>
      </div>

      <TodoList :todoList="handleFilteredTodoList" v-else />
    </section>
  </section>
</template>

<!-- FUNTIONALITY -->
<script>
import { computed } from "vue";
import TodoCreateForm from "./components/TodoCreateForm.vue";
import TodoFilterAction from "./components/TodoFilterAction.vue";
import TodoList from "./components/TodoList.vue";

export default {
  data() {
    return {
      todoList: [],
      inputError: "hidden",
      filter: "all",
      todoEditId: null,
      loading: false,
      todoInput: "",
    };
  },

  methods: {
    // CREATE & EDIT
    handleTodoCreate(todoTitle) {
      if (!this.todoInput) {
        this.inputError = "visible";
        return;
      } else {
        this.inputError = "hidden";
      }

      if (this.todoEditId) {
        const todo = this.todoList.find((item) => item.id === this.todoEditId);
        todo.title = this.todoInput;

        fetch(`http://localhost:8000/todos/${this.todoEditId}`, {
          method: "PUT",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.todoInput = "";
      } else {
        const todo = {
          title: this.todoInput,
          complete: false,
        };

        console.log(todo.title);

        fetch(`http://localhost:8000/todos`, {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            this.todoList.unshift(todo);
          })
          .catch((error) => {
            console.error("Error Creating todo:", error);
          });
      }
      this.todoInput = "";
    },

    // COMPLETE
    handleTodoComplete(todoId) {
      const todo = this.todoList.find((item) => item.id === todoId);
      todo.complete = !todo.complete;
      console.log(todo);

      fetch(`http://localhost:8000/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    // DELETE
    handleTodoDelete(todoId) {
      fetch(`http://localhost:8000/todos/${todoId}`, {
        method: "DELETE",
      })
        .then(() => {
          // Remove the deleted todo from the todoList array
          this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
        });
    },

    // EDIT
    handleTodoEditTitle(todoId) {
      this.todoEditId = todoId.id;
      this.todoInput = todoId.title;
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
      handleTodoEditTitle: this.handleTodoEditTitle,
      todoList: computed(() => this.todoList),
    };
  },

  created() {
    this.loading = true;
    console.log("Component Created");

    fetch("http://localhost:8000/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((todos) => {
        this.todoList = todos;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error("Error fetching todos:", error);
      });
  },
};
</script>
