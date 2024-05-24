<template>
    <div class="my-8 container m-auto text-xl">
        <div class="flex justify-between items-center rounded-lg p-4">
            <div class="text-2xl pl-2">
                <button @click="showPreviousMonth" class="mr-6">&#10094;</button>
                <button @click="showNextMonth">&#10095;</button>
            </div>
            <h2 class="text-center">{{ getMonthName(currentMonth) }} {{ currentYear }}</h2>
            <div class="pr-2">
                <select v-model="currentYear" @change="createCalendar()" class="bg-transparent">
                    <option v-for="year in yearRange" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
      </div>
      <table class="w-full mt-6">
        <tr>
          <th v-for="weekday in weekdays" :key="weekday" class="border-b-2 text-center cursor-pointer py-1 px-1">{{ weekday }}</th>
        </tr>
        <tr v-for="week in weeks" :key="week.id">
          <td v-for="day in week.days" :key="day.date"
           :class="[
              isToday(day) ? 'bg-blue-400' : '',
              day.selected ? 'bg-green-400' : 'bg-white'
          ]"
          class="border-2 text-center cursor-pointer py-1 px-1 h-32 w-24 hover:bg-orange-300 hover:shadow-outline"
          @click="selectDay(day)">
          {{ day.date }}
          <div class="text-sm">
            <ul>
              <li v-for="(todo, idx) in getEventByDate(day)" :key="todo.id">
                <p v-if="idx<=maxContainIndex" class="p-2 m-2 bg-blue-100 rounded-lg">
                    <span :title="todo.name">{{todo.name}}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="mb-2">
            <span v-if="getEventByDate(day).length>maxContainIndex" class="p-2 mb-2 text-xs bg-orange-200  rounded-lg">Click for More</span>
          </div>
      </td>
        </tr>
      </table>
      <InfoModal v-if="showInfoModal" :date="showDate.date" :showDateTitle="showDate.title" :showInfoModal="showInfoModal" @close="showInfoModal=false"/>
    </div>
  </template>
  
<script setup lang="ts">
const maxContainIndex = 2;
const todosStore = useTodosStore();
const todos = ref(todosStore.todos);
const showInfoModal = ref<boolean>(false);
const currentYear = ref<number>(new Date().getFullYear());
const currentMonth = ref<number>(new Date().getMonth());
const selectedDay = ref<any>();
const weekdays = ref<string[]>([
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
       ]);
const weeks = ref<object[]>([]);
const yearRange = computed(() => {
        let years = [];
        for (let i = 1970; i <= 2090; i++) {
          years.push(i);
        }
        return years;
});
const getMonthName = (month: number) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return months[month];
};
const showPreviousMonth = () => {
        if (currentMonth.value === 0) {
          currentYear.value--;
          currentMonth.value = 11;
        } else {
          currentMonth.value--;
        }
        createCalendar();
};
const showNextMonth = () => {
        if (currentMonth.value === 11) {
          currentYear.value++;
          currentMonth.value = 0;
        } else {
          currentMonth.value++;
        }
        createCalendar();
};
const isToday = (day: any) => {
        let today = new Date();
        return day.date === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
}
const selectDay = (day: any) => {
        if (selectedDay.value == day) {
            day.selected = false;
            selectedDay.value = null;
            showInfoModal.value = false;
        } else {
            if (selectedDay.value) {
              selectedDay.value.selected = false;  
            }
            day.selected = true;
            selectedDay.value = day;
            showInfoModal.value = true;
        }
};
const createCalendar = () => {
        weeks.value = [];
        let firstDay = new Date(currentYear.value, currentMonth.value, 1);
        let startingDay = firstDay.getDay();
        let daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
        let date = 1;
        for (let row = 0; row < 6; row++) {
          let week = { id: row, days: [] };
          for (let col = 0; col < 7; col++) {
            if (row === 0 && col < startingDay) {
              week.days.push({ date: null });
            } else if (date > daysInMonth) {
              break;
            } else {
              week.days.push({ date: date, selected: false });
              date++;
            }
          }
          weeks.value.push(week);
        }
};

const showDate = computed(() => {
    return ({
        "title": `${selectedDay.value.date} ${getMonthName(currentMonth.value)} ${currentYear.value}`,
        "date": new Date(currentYear.value, currentMonth.value, selectedDay.value.date),
    });
});


const getEventByDate = (day: any) => {
      let res = [];
      const startDate = new Date(currentYear.value, currentMonth.value, day.date)
      res = todos.value.filter((todo) => {
        const todoDate = new Date(todo.date.seconds*1000);
        if ( todoDate.getFullYear() == startDate.getFullYear() &&
         todoDate.getMonth() == startDate.getMonth() &&
         todoDate.getDate() == startDate.getDate())
          return todo
        }
        );
      return res;
    };

watch(showInfoModal, (newShowInfoModal, oldShowInfoModal) => {
       if (!newShowInfoModal){
        selectedDay.value.selected = false;
        selectedDay.value = null;
       }
 })
  onMounted(() => {
    createCalendar();
  })
  </script>