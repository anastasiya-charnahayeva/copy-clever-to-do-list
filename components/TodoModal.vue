<template>
        <teleport to="body">
            <div
                ref="modal-backdrop"
                class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-80"
            >
            <div
                class="flex items-start justify-center min-h-screen pt-24 text-center"
            >
                <div
                    class="flex justify-between bg-white rounded-lg text-left overflow-hidden shadow-xl pb-4 pl-6 pr-2 w-1/2"
                    role="dialog"
                    ref="modal"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                        <div class="w-full max-w-lg m-auto pt-6">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                    Name of the task
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" :placeholder="data?.name??'Name'" v-model="name">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                                    Description
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" :placeholder="data?.description??'Description'" v-model="description"/>
                            </div>
  
                            <div class="w-full mb-2">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                                    Date
                                </label>
                                <div class="dp-container-wrap shadow appearance-none border rounded">
                                    <VueDatePicker 
                                        v-model="date"
                                        teleport
                                        auto-apply
                                        input-class-name="dp-custom-input"
                                        :placeholder="data?.date?.seconds?new Date(data?.date?.seconds*1000):'Select date'"
                                    />
                                </div>
                            </div>
                            <div class="mb-4 pt-6">            
                                <label class="inline-flex items-center pl-1 cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" :checked="data?.done??false" v-model="done">
                                <div class="relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Done</span>
                                </label>
                            </div>

                            <div class="flex items-center flex-row-reverse">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="saveData">
                                    Save
                                </button>
                            </div>
                        </div>
                        <button class="text-xs mt-2 bg-transparent hover:bg-red-500 text-red-700 hover:text-white border border-red-500 hover:border-transparent rounded-full h-8 w-8 pb-1 flex items-center justify-center" @click="$emit('close')">
                            &#9587;
                        </button>
                </div>
            </div>
            </div>
        </teleport>    
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits<{
  (event: 'saveData', payload: any): void;
}>();
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  }
});
const { showModal, data } = props;
const name = ref<string>();
const description = ref<string>();
const date = ref<any>();
const done = ref<boolean>(false);

const saveData = () => {
    emit('saveData', {name: name.value, description: description.value, done: done.value, id: data?.id, date: date.value});
}

onMounted(() => {
    if (data) {
        name.value = data?.name;
        description.value = data?.description;
        done.value = data?.done;
        date.value = new Date(data?.date?.seconds*1000);
    }
})
</script>

<style>
.dp-custom-input {
  box-shadow: 0 0 6px lightgray;
  border: none;
}
</style>