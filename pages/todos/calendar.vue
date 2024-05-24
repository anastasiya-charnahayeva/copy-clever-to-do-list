<template>
    <div class="w-full">
        <Calendar/>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
    middleware: ['auth'],
    })
const isOpen = ref(false)
</script>