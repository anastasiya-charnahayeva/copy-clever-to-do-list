<template>
    <header class="bg-gray-700">
    <nav class="container mx-auto p-4 flex justify-end text-white">
        <div class="flex-1">
          <NuxtLink to="/" class="hover:text-blue-500"> Home </NuxtLink>
        </div>
        <div class="flex-1">
            <NuxtLink to="/todos" class="hover:text-blue-500"> All tasks </NuxtLink>
        </div>
        <div class="flex-1">
            <NuxtLink to="/todos/today" class="hover:text-blue-500"> Today's tasks </NuxtLink>
        </div>
        <div class="flex-1">
            <NuxtLink to="/todos/calendar" class="hover:text-blue-500"> Calendar </NuxtLink>
        </div>
      <button class="hover:text-blue-500" @click="signOut">
        Sign Out
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/useAuth'
const auth = useAuthStore()
const router = useRouter()


async function signOut() {
  router.push({ path: "/" })
  await auth.signOutUser()

}
</script>