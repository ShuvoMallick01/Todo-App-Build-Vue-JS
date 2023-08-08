<template>
  <ul class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg">
    <!-- Single Todo -->
    <TodoListItem v-for="todo in todoList" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

export default {
  inheritAttrs: false,
  props: {
    todoList: Object,
  },

  components: {
    TodoListItem,
  },
};
</script>
