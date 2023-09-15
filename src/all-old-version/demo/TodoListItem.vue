<template>
  <li class="flex items-center justify-between px-4 py-2">
    <p class="text-lg font-medium text-slate-300">todo</p>

    <div class="flex items-center gap-4">
      <input
        class="cursor-pointer w-4 h-4 rounded-full focus:ring-offset-0 focus:ring-0"
        type="checkbox"
      />

      <button class="text-sm hover:text-slate-100 text-slate-300">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>

      <button class="text-sm hover:text-slate-100 text-slate-300">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  </li>
</template>

<script>
// import { nanoid } from "nanoid";

export default {
  props: {},
};
</script>
