<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- TODO FORM -->
      <!-- @create="handleTodoCreate($event)"
      :todoEditInputTitle="todoEditInputTitle" -->
      <TodoCreateForm />
      <p class="mt-2 text-red-500 text-sm" :class="inputError">
        Input filed required!
      </p>

      <!-- FILTER ACTION -->
      <TodoFilterAction />
      <!-- :todoListLength="todoListLength"
      @filterEvent="handleChangeFilter($event)"
      :filter="filter" -->

      <!-- TODO LIST -->
      <TodoList />
      <!-- :todoList="handleFilteredTodoList"
      @complete="handleTodoComplete($event)"
      @delete="handleTodoDelete($event)"
      @editTodo="handleTodoEditTitle($event)" -->
    </section>
    {{ now }}
  </section>
</template>

<!-- FUNTIONALITY -->
<script setup>
import { ref, reactive, computed } from "vue";
import TodoCreateForm from "./components/TodoCreateForm.vue";
// import TodoFilterAction from "./components/TodoFilterAction.vue";
import TodoList from "./components/TodoList.vue";
import { nanoid } from "nanoid";

// VARIABLE/STATE
const todoList = ref(
  localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [
        { id: nanoid(10), title: "Learn React JS", complete: false },
        { id: nanoid(10), title: "Learn Vue JS", complete: true },
        { id: nanoid(10), title: "Learn JS", complete: false },
      ]
);
const inputError = ref("hidden");
const filter = ref("all");
const todoEditInputTitle = ref("");
const todoEditId = ref("");

// Self Practif
const book = reactive([ref("vue js")]);
console.log(book[0].value);

const map = reactive(new Map([["count", ref(0)]]));
console.log(map.get("count").value);
// METHODS
// handleTodoCreate(title) {
//   if (!title) {
//     inputError = "visible";
//     return;
//   } else {
//     inputError = "hidden";
//   }

//   if (todoEditId !== "") {
//     todoList = todoList.map((item) =>
//       item.id === this.todoEditId ? { ...item, title: title } : item
//     );
//     todoEditInputTitle = "";
//   } else {
//     const todo = {
//       id: nanoid(10),
//       title: title,
//       complete: false,
//     };
//     todoList.unshift(todo);
//   }
// }

// handleTodoComplete(todoId) {
//   todoList = this.todoList.map((item) =>
//     item.id === todoId ? { ...item, complete: !item.complete } : item
//   );
// }

// handleTodoDelete(todoId) {
//   this.todoList = this.todoList.filter((item) => item.id !== todoId);
// }

// handleChangeFilter(filterValue) {
//   this.filter = filterValue;
// }

// handleTodoEditTitle(todoEditId) {
//   this.todoEditId = todoEditId;
//   const editTodo = this.todoList.find((item) => item.id === todoEditId);
//   this.todoEditInputTitle = editTodo.title;
// }

// COMPUTED PROPERTY
const handleFilteredTodoList = computed(() => {
  const updatedTodoList = this.todoList.filter((todo) => {
    if (this.filter === "complete") {
      return todo.complete;
    } else if (this.filter === "incomplete") {
      return !todo.complete;
    }
    return true;
  });
  return updatedTodoList;
});

const todoListLength = computed(() => {
  return {
    all: this.todoList.length,
    complete: this.todoList.filter((item) => item.complete).length,
    incomplete: this.todoList.filter((item) => !item.complete).length,
  };
});

const now = computed(() => Date.now());

//   watch: {
//     todoList: {
//       handler: (newValue) => {
//         localStorage.setItem("todos", JSON.stringify(newValue));
//       },
//       deep: true,
//     },
//   },

//   components: {
//     TodoCreateForm,
//     TodoFilterAction,
//     TodoList,
//   },
</script>
