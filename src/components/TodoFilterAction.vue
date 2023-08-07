<template>
  <div class="flex items-center w-full gap-5 my-6">
    <button
      @click="$emit('filterEvent', 'all')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="filter === 'all' ? 'bg-slate-700' : ''"
    >
      ALL - ({{ todoListLength.all }})
    </button>
    <button
      @click="$emit('filterEvent', 'complete')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="filter === 'complete' ? 'bg-slate-700' : ''"
    >
      COMPLETE - ({{ todoListLength.complete }})
    </button>
    <button
      @click="$emit('filterEvent', 'incomplete')"
      class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
      :class="filter === 'incomplete' ? 'bg-slate-700' : ''"
    >
      INCOMPLETE - ({{ todoListLength.incomplete }})
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    todoListLength: Object,
    filter: String,
  },
  methods: {},
};
</script>
