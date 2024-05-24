<template>
  <div>
    <Header v-if="showHeader"/>
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const showHeader = computed(() => {
  if (['/login', '/register'].includes(router.currentRoute.value.path)) return false;
  return true;
})
</script>
<style>
  .btn {
    @apply py-2 px-4;
  }
  .btn-blue {
    @apply bg-blue-700 text-white;
  }
  .btn-blue:hover {
    @apply text-opacity-75 cursor-pointer;
  }
</style>