<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- TODO FORM -->

      <TodoCreateForm
        :handleTodoCreate="handleTodoCreate"
        :modelValue="todoInput"
        @update:modelValue="(newValue) => (todoInput = newValue)"
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
        @editTodo="handleTodoEdit($event)"
      />
    </section>
    <!-- SELF PRACTICE -->
  </section>
</template>

<!-- FUNTIONALITY -->
<script setup>
import { ref, reactive, computed, watch } from "vue";
import TodoCreateForm from "./components/TodoCreateForm.vue";
import TodoFilterAction from "./components/TodoFilterAction.vue";
import TodoList from "./components/TodoList.vue";
import { nanoid } from "nanoid";

// VARIABLE/STATE
let todoList = ref(
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
const todoEditId = ref("");
let todoInput = ref("");
// console.log(todoInput.value);

// Self Practif

// METHODS
const handleTodoCreate = () => {
  console.log(todoInput.value, todoEditId.value);

  if (!todoInput.value) {
    inputError.value = "visible";
    return;
  } else {
    inputError.value = "hidden";
  }

  if (todoEditId.value) {
    todoList.value = todoList.value.map((item) =>
      item.id === todoEditId.value ? { ...item, title: todoInput.value } : item
    );
    todoInput.value = "";
  } else {
    const todo = {
      id: nanoid(10),
      title: todoInput.value,
      complete: false,
    };
    todoList.value.unshift(todo);
    todoInput.value = "";
  }
};

const handleTodoComplete = (todoId) => {
  // console.log(todoId);
  todoList.value = todoList.value.map((item) =>
    item.id === todoId ? { ...item, complete: !item.complete } : item
  );
};

const handleTodoDelete = (todoId) => {
  console.log(todoId);
  todoList.value = todoList.value.filter((item) => item.id !== todoId);
};

const handleChangeFilter = (filterValue) => {
  filter.value = filterValue;
};

const handleTodoEdit = (editId) => {
  todoEditId.value = editId;
  let todo = todoList.value.find((item) => item.id === editId);
  todoInput.value = todo.title;
  console.log(todoEditId.value);
};

// COMPUTED PROPERTY
const handleFilteredTodoList = computed(() => {
  const updatedTodoList = todoList.value.filter((todo) => {
    if (filter.value === "complete") {
      return todo.complete;
    } else if (filter.value === "incomplete") {
      return !todo.complete;
    }
    return true;
  });
  return updatedTodoList;
});

const todoListLength = computed(() => {
  return {
    all: todoList.value.length,
    complete: todoList.value.filter((item) => item.complete).length,
    incomplete: todoList.value.filter((item) => !item.complete).length,
  };
});

watch(
  todoList,
  (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    localStorage.setItem("todos", JSON.stringify(newValue));
  },
  { deep: true }
);
</script>
