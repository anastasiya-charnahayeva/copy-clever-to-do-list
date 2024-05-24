<template>
        <teleport to="body">
            <div
                ref="modal-backdrop"
                class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
            >
            <div
                class="flex items-start justify-center min-h-screen pt-24 text-center"
            >
                <div
                    class="flex justify-between bg-white rounded-lg text-left overflow-hidden shadow-xl pb-4 pl-6 pr-2 w-1/2"
                    role="dialog"
                    ref="modal"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    
                    
                  <div class="w-full max-w-4xl m-auto pt-6">
                      <h2 class="text-center text-xl mb-4">{{showDateTitle}}</h2>
                      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @toggleChanging="(e) => changeStatus(e, todo.id)" @removeItem="(e) => remove(e, todo.id)" :infoModal="true"/>
                  </div>
                  <button class="text-xs mt-2 bg-transparent hover:bg-red-500 text-red-700 hover:text-white border border-red-500 hover:border-transparent rounded-full h-8 w-8 pb-1 flex items-center justify-center" @click="closeModal">
                      &#9587;
                  </button>
                </div>
            </div>
            </div>
        </teleport>    
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'close'): void;
}>();
const todosStore = useTodosStore();
const todos = ref(todosStore.todos);
const props = defineProps({
  showDateTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  showInfoModal: {
    type: Boolean,
    required: true,
  }
});
const { date, showInfoModal } = props;
const filteredTodos = ref<any>(todos);
const changeStatus = async (e: boolean, id: string) => {
  await todosStore.changeStatus(e, id);
  updateFilteredTodos();
}

const closeModal = () => {
  emit('close');
}

const remove = async (e: any, id: string) => {  
  closeModal();
  await todosStore.remove(e, id);
  updateFilteredTodos();
}

const updateFilteredTodos = () => {
   const startDate = new Date(date);
      filteredTodos.value = todos.value.filter((todo) => {
        const todoDate = new Date(todo.date.seconds*1000);
        if (todoDate.getFullYear() == startDate.getFullYear() &&
         todoDate.getMonth() == startDate.getMonth() &&
         todoDate.getDate() == startDate.getDate())         
          return todo
        }
        );
}

onMounted(() => {
      updateFilteredTodos();
})
</script>

<style>
.dp-custom-input {
  box-shadow: 0 0 6px lightgray;
  border: none;
}
</style>