
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()

  async function createUser(values: {email: string, password: string}) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    user.value = userCredential.user;
  }

  async function signInUser(values:  {email: string, password: string}) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
    user.value = userCredential.user;
  }

  async function signOutUser() {
    const auth = getAuth();
    await signOut(auth);
    user.value = null;
  }

  return {
    user,
    createUser,
    signInUser,
    signOutUser,
  }
}, {
  persist: true,
})
