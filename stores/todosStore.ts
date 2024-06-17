
import {useAuthStore} from '@/stores/useAuth';
import { useTodosApi } from '~/composables/api/useTodosApi';


export const useTodosStore = defineStore('todos', async() => {

  // const data = await useFetch('/api/todos');
  // const todos = ref(data.data);
  const todos = ref([]);

  

  const auth = JSON.stringify(useAuthStore());
  const authStore = JSON.parse(auth);
  const { getAllTodos } = useTodosApi();
  console.log('auth', authStore);
  const { data } = await getAllTodos();
  todos.value = data.value;
  console.log('todos store', JSON.parse(todos.value));


  const changeStatus = async (e: boolean, id: string) => {
    await useFetch('/api/updateTodo',{ id: id, done: e } );
  }

  const remove = async (e: any, id: string) => {
    await useFetch('/api/removeTodo',{ id: id });
  }

  const saveData = async (data) => {
    const userId = authStore.user.id;

    const newObj = {
      done: data?.done ? true : false,
      name: data.name || "",
      description: data.description || "",
      date: data.date || new Date(),
      userId
    }
    if (data?.id) {
      await useFetch('/api/updateTodo', { id: data.id, data: newObj });
    } else {
      await useFetch('/api/addTodo', newObj);
    }
  }

  return {
    todos,
    changeStatus,
    remove,
    saveData,
  }
})
