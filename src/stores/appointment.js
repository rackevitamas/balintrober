import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from '@/router';
import dayjs from 'dayjs';

export const useAppointmentStore = defineStore('appointment', () => {
  const appointmentStore = ref([]);
  const selectedDate = ref('');
  const selectedTime = ref('');

  const fetchAppointments = async () => {
    const resp = await axios.get('http://localhost:3000/appointment');
    appointmentStore.value = resp.data;  
  }

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const generateWeekDays = () => {
    const today = dayjs().startOf('week').add(1, 'day');
    return Array.from({ length: 5 }, (_, i) => today.add(i, 'day').format('YYYY-MM-DD'));
  };
  
  const weekDays = ref(generateWeekDays());

  const isFree = computed(() => {
    let freeSlots = Array(hours.length).fill(null).map(() => Array(weekDays.value.length).fill('szabad'));

    appointmentStore.value.forEach(appointment => {
      const dayIndex = weekDays.value.indexOf(appointment.date);
      const hourIndex = hours.indexOf(appointment.time);

      if (dayIndex !== -1 && hourIndex !== -1) {
        freeSlots[hourIndex][dayIndex] = 'foglalt';
      }
    });

    return freeSlots;
  });

  const newPage = (date, time) => {
    selectedDate.value = date;
    selectedTime.value = time;
    router.push('/appto');
  }
  
  const addNewAppoint = (a) => {
    a.id = (appointmentStore.value.length + 1).toString();
    appointmentStore.value.push(a);
    toAppoint(a);
    console.log(a);
    router.push('/');
  };

  const toAppoint = async (a) => {
    const resp = await axios.post('http://localhost:3000/appointment', a);
    console.log(resp.status);
  }

  return { 
    appointmentStore, fetchAppointments, hours, weekDays, isFree, selectedDate, selectedTime, newPage, addNewAppoint, toAppoint 
  };
})
