import { addDoc, collection, doc, getFirestore, updateDoc, where, deleteDoc } from "firebase/firestore";
import {useAuthStore} from './useAuth'


export const useTodosStore = defineStore('todos', async() => {

  // const data = await useFetch('/api/todos');
  // const todos = ref(data.data);
  const todos = ref([
    {
      "id": "agWjhTLetihuuFWWRpCd",
      "name": "First task",
      "userId": "ztcQYC7IDoPMtttLNIuZEHnrYQx1",
      "date": {
        "_seconds": 1716411600,
        "_nanoseconds": 0
      },
      "done": true,
      "description": "buy milk"
    },
    {
      "id": "g9m9KcN2dbAkU4Nt7XSe",
      "date": {
        "_seconds": 1716536640,
        "_nanoseconds": 0
      },
      "done": true,
      "userId": "ztcQYC7IDoPMtttLNIuZEHnrYQx1",
      "description": "00",
      "name": "0"
    },
    {
      "id": "xLErjAGPGW1jcgG5u5Qe",
      "date": {
        "_seconds": 1716536640,
        "_nanoseconds": 0
      },
      "name": "45",
      "description": "4545",
      "done": true,
      "userId": "ztcQYC7IDoPMtttLNIuZEHnrYQx1"
    }
  ])
  // console.log("Data", data.data);
  // console.log("todos", todos.value);


  const changeStatus = async (e: boolean, id: string) => {
    // await useFetch('/api/updateTodo',{ id: id, done: e } );
    // await updateDoc(doc(db, "todos", id), {done: e}, {merge: true});
  }

  const remove = async (e: any, id: string) => {
    // await useFetch('/api/removeTodo',{ id: id });/
    // await deleteDoc(doc(db, "todos", id));
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
      // await useFetch('/api/updateTodo', { id: data.id, data: newObj });
      // await updateDoc(doc(db, "todos", data?.id), data, {merge: true});
    } else {
      // await useFetch('/api/addTodo', newObj);
      // await addDoc(collection(db, "todos"), newObj);
    }
  }

  return {
    todos,
    changeStatus,
    remove,
    saveData,
  }
}, {
  persist: true,
})
