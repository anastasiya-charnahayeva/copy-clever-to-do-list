<template>
    <div>
        <div>Welcome!</div>
        <div>Email: {{ auth.user.email }}</div>
        <div>Uid: {{ auth.user.uid }}</div>
    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/useAuth';

definePageMeta({
  middleware: ['auth'],
})
  const auth = useAuthStore();
</script>