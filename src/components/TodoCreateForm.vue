<template>
  <form @submit.prevent="handleTodoCreate" class="flex items-center w-full">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Input todo.."
      class="w-full p-3 px-5 placeholder:text-slate-500 bg-transparent border-2 border-gray-500 rounded-l-lg hover:outline-none focus:border-gray-500 focus:ring-0"
    />

    <input
      type="submit"
      value="Add"
      class="p-3 px-6 text-gray-800 bg-gray-300 font-medium border-gray-100 rounded-r-lg text-lg cursor-pointer"
    />
  </form>
</template>

<!-- FUNCTIONALITY -->
<script setup>
let props = defineProps(["modelValue", "handleTodoCreate"]);
let emits = defineEmits(["update:modelValue"]);
</script>
