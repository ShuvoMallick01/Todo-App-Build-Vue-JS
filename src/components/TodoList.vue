<template>
  <ul class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg">
    <!-- Single Todo -->
    <TodoListItem
      v-for="todo in handleFilteredTodoList"
      :key="todo.id"
      :todo="todo"
    />
  </ul>
</template>

<script>
import { mapState } from "pinia";
import TodoListItem from "./TodoListItem.vue";
import { useTodosStore } from "../store/todos-store";

export default {
  inheritAttrs: false,

  computed: {
    ...mapState(useTodosStore, ["handleFilteredTodoList"]),
  },

  components: {
    TodoListItem,
  },
};
</script>
