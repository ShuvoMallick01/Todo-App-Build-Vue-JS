<template>
  <ul class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg">
    <!-- Single Todo -->
    <TodoListItem />
  </ul>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

export default {
  props: {},

  components: {
    TodoListItem,
  },
};
</script>
