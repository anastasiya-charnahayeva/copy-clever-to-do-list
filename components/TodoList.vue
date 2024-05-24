<template>
    <div class="my-6">
        <div class="container m-auto">
        <h1 class="text-xl font-semibold">{{today ? "Today's" : "All"}} tasks</h1>
        </div>
        <AddButton :showModal="showModal"  @click="showModal=true"/>
        <TodoModal :showModal="showModal" v-if="showModal" @close="showModal=false" :data="modalData" @saveData="(e, data, id) => saveData(e, data, id)"/>
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @toggleChanging="(e) => changeStatus(e, todo.id)" @openModal="(e) => edit(e, todo.id)" @removeItem="(e) => remove(e, todo.id)" @saveData="(e, data, id) => saveData(e, data, id)"/>
    </div>
</template>

<script setup lang="ts">
const todosStore = useTodosStore();
const todos = ref(todosStore.todos);
const filteredTodos = ref<any>(todos.value);
const showModal = ref<Boolean>(false);
const modalData = ref<Object>({
  name: "",
  description: '',
  done: false,
  date: new Date()
});
const props = defineProps({
  today: {
    type: Boolean,
    required: true,
  },

});
const { today } = props;

const changeStatus = async (e: boolean, id: string) => {  
  await todosStore.changeStatus(e, id);
  updateFilteredTodos();
}

const edit = (e: any, id: string) => {
  showModal.value = true;
  modalData.value = todos.value.find(todo => todo.id === id); 
}

const remove = async (e: any, id: string) => {  
  await todosStore.remove(e, id);
  updateFilteredTodos();
}

const saveData = async (data: any) => {
  showModal.value = false;
  await todosStore.saveData(data);
  modalData.value = {};
  updateFilteredTodos();
}

const updateFilteredTodos = () => {
    if (today) {
      const startDate = new Date();
      filteredTodos.value = todos.value.filter((todo) => {
        const todoDate = new Date(todo.date.seconds*1000);
        if ( todoDate.getFullYear() == startDate.getFullYear() &&
         todoDate.getMonth() == startDate.getMonth() &&
         todoDate.getDate() == startDate.getDate())
          return todo
        }
        );
      modalData.value['date'] = startDate;
    }
}

onMounted(() => {
    updateFilteredTodos();
})
</script>