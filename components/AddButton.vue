<template>
    <div class="container h-20 flex justify-center items-center m-auto mb-6 rounded-lg bg-blue bg-opacity-50">
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full h-10 w-10 flex items-center justify-center">
            &#10010;
        </button>
        <!-- <TodoModal :showModal="showModal"/> -->
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
let { showModal } = props;

</script>