<template>
  <section class="grid h-screen bg-gray-800 text-slate-100 place-items-center">
    <section class="w-full max-w-md m-auto">
      <!-- Todo Form -->
      <form
        @submit.prevent="handleTodoCreate"
        action=""
        class="flex items-center w-full"
      >
        <input
          type="text"
          v-model="todoInput"
          placeholder="Input todo.."
          class="w-full p-3 px-5 placeholder:text-slate-500 bg-transparent border-2 border-gray-500 rounded-l-lg hover:outline-none focus:border-gray-500 focus:ring-0"
        />
        <input
          type="submit"
          value="Add"
          class="p-3 px-6 text-gray-800 bg-gray-300 font-medium border-gray-100 rounded-r-lg text-lg cursor-pointer"
        />
      </form>
      <p class="mt-2 text-red-500 text-sm" :class="inputError">
        Input filed required!
      </p>

      <!-- FILTER ACTION -->
      <div class="flex items-center w-full gap-5 my-6">
        <button
          @click="handleChangeFilter('')"
          class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
          :class="{ 'bg-slate-700': filter === '' }"
        >
          ALL - ({{ todoListLength.all }})
        </button>
        <button
          @click="handleChangeFilter('complete')"
          class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
          :class="{ 'bg-slate-700': filter === 'complete' }"
        >
          COMPLETE - ({{ todoListLength.complete }})
        </button>
        <button
          @click="handleChangeFilter('incomplete')"
          class="flex-1 px-2 py-1 text-xs font-medium border border-gray-500 rounded-lg"
          :class="{ 'bg-slate-700': filter === 'incomplete' }"
        >
          INCOMPLETE - ({{ todoListLength.incomplete }})
        </button>
      </div>

      <!-- TODO LIST -->
      <ul
        class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg"
      >
        <!-- Single Todo -->
        <li
          v-for="todo in handleFilteredTodoList"
          key="todo.id"
          class="flex items-center justify-between px-4 py-2"
        >
          <p class="text-lg font-medium text-slate-300">
            {{ todo.title }}
          </p>

          <div class="flex items-center gap-4">
            <input
              class="cursor-pointer w-3 h-3 rounded-full bg-slate-800 focus:ring-0 text-slate-200 ring-2 ring-slate-200"
              type="checkbox"
              id="complete"
              v-model="todo.complete"
              @click="handTodoComplete(todo.id)"
            />

            <button class="text-sm hover:text-slate-100 text-slate-300">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      todoList: localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [
            { id: nanoid(10), title: "Learn React JS", complete: false },
            { id: nanoid(10), title: "Learn Vue JS", complete: true },
            { id: nanoid(10), title: "Learn JS", complete: false },
          ],
      todoInput: "",
      inputError: "hidden",
      filter: "",
    };
  },

  methods: {
    handTodoComplete(todoId) {
      this.todoList = this.todoList.map((item) =>
        item.id === todoId ? { ...item, complete: !complete } : item
      );
    },

    handleTodoCreate() {
      if (!this.todoInput) {
        // alert("Input todo Required!");
        this.inputError = "visible";
        return;
      } else {
        this.inputError = "hidden";
      }

      const todo = {
        id: nanoid(10),
        title: this.todoInput,
        complete: false,
      };
      this.todoList.unshift(todo);
      this.todoInput = "";
    },

    handleChangeFilter(filterValue) {
      this.filter = filterValue;
    },
  },

  computed: {
    handleFilteredTodoList() {
      const updatedTodoList = this.todoList.filter((todo) => {
        if (this.filter === "complete") {
          return todo.complete;
        } else if (this.filter === "incomplete") {
          return !todo.complete;
        }
        return true;
      });

      return updatedTodoList;
    },

    todoListLength() {
      return {
        all: this.todoList.length,
        complete: this.todoList.filter((item) => item.complete).length,
        incomplete: this.todoList.filter((item) => !item.complete).length,
      };
    },
  },

  watch: {
    todoList: {
      handler: (newValue) => {
        // console.log(newValue);
        localStorage.setItem("todos", JSON.stringify(newValue));
      },
      deep: true,
    },
  },
};
</script>
