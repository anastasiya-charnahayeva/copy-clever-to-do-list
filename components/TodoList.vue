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

import { useTodosApi } from '~/composables/api/useTodosApi';
import {useAuthStore} from '@/stores/useAuth'
import { useTodosStore }  from '@/stores/todosStore'

const auth = useAuthStore();
const authStore = auth;
const { getAllTodos, saveData: saveTodoData, remove: removeTodo, updateTodo: update } = useTodosApi();

const { data } = await getAllTodos();

const todosStore = useTodosStore();
const todos = ref(data.value);
const filteredTodos = ref(todos.value);
const showModal = ref<Boolean>(false);
const modalData = ref<Object>({
  name: "",
  description: '',
  done: false,
  date: new Date()
});

interface Props {  
  today: Boolean
}

const props = defineProps<Props>();
const { today } = toRefs(props);

const changeStatus = async (e: boolean, id: string) => {
  await update({ id: id, done: e });
  updateFilteredTodos();
}

const edit = (e: any, id: string) => {
  showModal.value = true;
  modalData.value = todos.value.find(todo => todo.id === id); 
}

const remove = async (e: any, id: string) => {  
  await removeTodo({ id: id });
  updateFilteredTodos();
}

const saveData = async (data: any) => {
  showModal.value = false;
    const userId = authStore.user.id;

    const newObj = {
      done: data?.done ? true : false,
      name: data.name || "",
      description: data.description || "",
      date: data.date || new Date(),
      userId
    }
    if (data?.id) {
      await update({ id: data.id, data: newObj });
    } else {
      await saveTodoData(newObj);
    }
  modalData.value = {};
  updateFilteredTodos();
}

const updateFilteredTodos = () => {
    if (today) {
      const startDate = new Date();
      filteredTodos.value = todos.value?.filter((todo) => {
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