<template>
    <div>
        <TodoList :today="true"/>
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
    middleware: ['auth'],
    })
</script>