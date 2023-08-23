<template>
  <div class="flex items-center w-full gap-5 my-6">
    <!-- @click="$emit('update:filter', 'all')" -->
    <button
      @click="filter = 'all'"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'all' }"
    >
      ALL - ({{ todoListLength.all }})
    </button>

    <!-- @click="$emit('update:filter', 'complete')" -->
    <button
      @click="filter = 'complete'"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'complete' }"
    >
      COMPLETE - ({{ todoListLength.complete }})
    </button>

    <!-- @click="$emit('update:filter', 'incomplete')" -->
    <button
      @click="filter = 'incomplete'"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="{ 'bg-slate-700': filter === 'incomplete' }"
    >
      INCOMPLETE - ({{ todoListLength.incomplete }})
    </button>
  </div>
</template>

<!-- FUNCTIONALITY -->
<script>
import { mapState, mapWritableState } from "pinia";
import { useTodosStore } from "../store/todos-store";

export default {
  // props: {
  //   filter: String,
  //   todoListLength: Object,
  // },

  computed: {
    ...mapWritableState(useTodosStore, ["filter"]),
    ...mapState(useTodosStore, ["todoListLength"]),
  },
};
</script>
