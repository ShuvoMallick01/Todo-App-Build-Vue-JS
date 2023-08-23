<template>
  <form @submit.prevent="handleTodoCreate" class="flex items-center w-full">
    <input
      type="text"
      placeholder="Input todo.."
      class="w-full p-3 px-5 placeholder:text-slate-500 bg-transparent border-2 border-gray-500 rounded-l-lg hover:outline-none focus:border-gray-500 focus:ring-0"
      v-model="todoInput"
    />

    <input
      type="submit"
      value="Add"
      class="p-3 px-6 text-gray-800 bg-gray-300 font-medium border-gray-100 rounded-r-lg text-lg cursor-pointer"
    />
  </form>
</template>

<script>
import { mapWritableState, mapActions, mapState } from "pinia";
import { useTodosStore } from "../store/todos-store";
export default {
  computed: {
    ...mapWritableState(useTodosStore, ["todoInput"]),
  },

  methods: {
    ...mapActions(useTodosStore, ["handleTodoCreate"]),
  },
};
</script>
