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

<script setup>
import TodoListItem from "./TodoListItem.vue";
import { defineProps } from "vue";

const emit = defineEmits(["complete"]);

const props = defineProps({
  todoList: {
    type: Array,
    required: true,
    default: [],
  },
});

const handleComplete = (e) => {
  emit("complete", e);
};
</script>
