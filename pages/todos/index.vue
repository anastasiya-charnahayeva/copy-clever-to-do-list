<template>
    <TodoList :today="false"/>
</template>

<script setup lang="ts">
    definePageMeta({
    middleware: ['auth'],
    })
</script>
