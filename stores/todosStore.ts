import { addDoc, collection, doc, getFirestore, updateDoc, where, deleteDoc } from "firebase/firestore";

export const useTodosStore = defineStore('todos', () => {  
  const { $firebaseApp } = useNuxtApp();
  const db = getFirestore($firebaseApp);
  const todosRef = collection(db, "todos");
  const res = useCollection(todosRef, {
    where: ['userId', '==', localStorage.getItem('uid')],
  });
  const todos = ref(res.data);

  const changeStatus = async (e: boolean, id: string) => {
    await updateDoc(doc(db, "todos", id), {done: e}, {merge: true});
  }

  const remove = async (e: any, id: string) => {
    await deleteDoc(doc(db, "todos", id));
  }

  const saveData = async (data) => {
    const userId = localStorage.getItem('uid');
    const newObj = {
      done: data?.done ? true : false,
      name: data.name || "",
      description: data.description || "",
      date: data.date || new Date(),
      userId
    }
    if (data?.id) {
      await updateDoc(doc(db, "todos", data?.id), data, {merge: true});
    } else {
      await addDoc(collection(db, "todos"), newObj);
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
