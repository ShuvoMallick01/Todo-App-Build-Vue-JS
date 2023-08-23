<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- TODO FORM -->
      <TodoCreateForm />
      <p class="mt-2 text-red-500 text-sm" :class="inputError">
        Input filed required!
      </p>

      <!-- FILTER ACTION -->
      <TodoFilterAction />

      <!-- TODO LIST -->
      <TodoList />
    </section>
  </section>
</template>

<!-- FUNTIONALITY -->
<script>
import TodoCreateForm from "./components/TodoCreateForm.vue";
import TodoFilterAction from "./components/TodoFilterAction.vue";
import TodoList from "./components/TodoList.vue";

import { mapState, mapStores } from "pinia";
import { useTodosStore } from "./store/todos-store";

export default {
  computed: {
    ...mapState(useTodosStore, ["inputError", "todoList"]),
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
