<template>
  <div>
    <h2>Időpont foglalás</h2>
    <form @submit.prevent="submitForm">
      <label for="name">Név:</label>
      <input type="text" v-model="name" required>
      <br>

      <label for="phone">Telefonszám:</label>
      <input type="text" v-model="phone" required>
      <br>

      <label for="date">Dátum:</label>
      <input type="text" v-model="store.selectedDate" disabled>
      <br>

      <label for="time">Időpont:</label>
      <input type="text" v-model="store.selectedTime" disabled>
      <br>

      <label for="category">Szolgáltatás:</label>
      <select v-model="category" required>
        <option value="pszichológus">Pszichológus</option>
        <option value="fodrász">Fodrász</option>
        <option value="műkörmös">Műkörmös</option>
        <option value="orvos">Orvos</option>
        <option value="műszaki vizsga">Műszaki vizsga</option>
        <option value="tetováló">Tetováló</option>
        <option value="hivatali ügyintézés">Hivatali ügyintézés</option>
      </select>
      <br>

      <input type="submit" value="Foglalás">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppointmentStore } from '@/stores/appointment';

const store = useAppointmentStore();

const name = ref('');
const phone = ref('');
const category = ref('');

const submitForm = () => {
  store.addNewAppoint({
    id: '',
    name: name.value,
    phone: phone.value,
    date: store.selectedDate, 
    time: store.selectedTime,
    category: category.value
  });
};
</script>
