<template>
  <li class="flex items-center justify-between px-4 py-2">
    <p class="text-lg font-medium text-slate-300">{{ todo.title }}</p>

    <div class="flex items-center gap-4">
      <input
        class="cursor-pointer w-4 h-4 rounded-full focus:ring-offset-0 focus:ring-0"
        type="checkbox"
        :id="todo.id"
        :checked="todo.complete"
        @input="handleTodoComplete(todo.id)"
      />

      <button
        @click="handleTodoEdit(todo.id)"
        class="text-sm hover:text-slate-100 text-slate-300"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>

      <button
        @click="handleTodoDelete(todo.id)"
        class="text-sm hover:text-slate-100 text-slate-300"
      >
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  </li>
</template>

<script>
import { nanoid } from "nanoid";
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "../store/todos-store";

export default {
  props: {
    todo: {
      type: Object,
      default: { id: nanoid(10), title: "Learn React JS", complete: false },
      required: true,
    },
  },

  methods: {
    ...mapActions(useTodosStore, [
      "handleTodoDelete",
      "handleTodoComplete",
      "handleTodoEdit",
    ]),
  },
};
</script>
