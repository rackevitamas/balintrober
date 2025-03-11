import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAppointmentStore = defineStore('appointment', () => {
  const appointmentStore = ref([]);
  const fetchAppointments = async () => {
    const resp = await axios.get('http://localhost:3000/appointment');
    appointmentStore.value = resp.data;  
  }

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const isFree = [];
  let rows = 8;
  let col = 4;

  for (let i = 0; i < rows; i++) {
    isFree[i] = [];
    for (let j = 0; j < col; j++) {
      if (appointmentStore.value[j] == hours[i]) {
        isFree[i][j] = 'foglalt';
      }
      else
      {
        isFree[i][j] = 'szabad';
      }
    }
  }

  return { appointmentStore, fetchAppointments, isFree }
})
