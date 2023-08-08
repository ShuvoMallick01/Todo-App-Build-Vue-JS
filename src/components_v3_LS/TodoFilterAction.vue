<template>
  <div class="flex items-center w-full gap-5 my-6">
    <button
      @click="$emit('update:filter', 'all')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'all' }"
    >
      ALL - ({{ todoListLength.all }})
    </button>
    <button
      @click="$emit('update:filter', 'complete')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'complete' }"
    >
      COMPLETE - ({{ todoListLength.complete }})
    </button>
    <button
      @click="$emit('update:filter', 'incomplete')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'incomplete' }"
    >
      INCOMPLETE - ({{ todoListLength.incomplete }})
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter: String,
    todoListLength: Object,
  },
};
</script>
