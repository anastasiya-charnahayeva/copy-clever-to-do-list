<template>
    <div class="container flex justify-between m-auto mb-6 rounded-lg">
        <div class="my-3 pl-4">
          <div class="mb-4">
            <h1 class="text-xl font-semibold">{{todo.name}}</h1>
          </div>
          <div>
            <p>{{todo.description}}</p>
          </div>
        </div>
        <div class="my-3">
          <div class="mb-2">
            <label class="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" :checked="todo.done" @change="$emit('toggleChanging', $event.target.checked)">
              <div class="relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Done</span>
            </label>
          </div>
          <div class="flex">
            <div v-if="!infoModal" class="ml-1 mr-5">
               <button class="text-lg bg-transparent hover:bg-orange-500 text-gray-600 py-2 px-4 border border-orange-500 hover:border-transparent rounded-full h-8 w-8 flex items-center justify-center"  @click="$emit('openModal', $event.target)">
                &#128393;
               </button>
            </div>
            <div class="ml-1">
               <button class="text-sm bg-transparent hover:bg-orange-500 text-gray-600 py-2 px-4 border border-orange-500 hover:border-transparent rounded-full h-8 w-8 flex items-center justify-center" @click="$emit('removeItem', $event.target)">
                &#128465;
               </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const todosStore = useTodosStore();
const todos = ref(todosStore.todos);
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  infoModal: {
    type: Boolean,
    required: false,
  }
});
const { todo } = props;
</script>