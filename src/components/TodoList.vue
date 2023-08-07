<template>
  <ul class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg">
    <!-- Single Todo -->
    <TodoListItem
      v-for="todo in todoList"
      :key="todo.id"
      :todo="todo"
      @complete="handleComplete($event)"
      @delete="$emit('delete', $event)"
      @editTodo="$emit('editTodo', $event)"
    />
  </ul>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

export default {
  props: {
    todoList: Object,
  },

  methods: {
    handleComplete(e) {
      this.$emit("complete", e);
    },
  },

  components: {
    TodoListItem,
  },
};
</script>
