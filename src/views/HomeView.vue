<script setup>
  import { onMounted } from 'vue';
  import { useAppointmentStore } from '@/stores/appointment';

  const store = useAppointmentStore();

  onMounted(async () => {
    await store.fetchAppointments();
  })

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <p v-for="(h, index) in store.hours" :key="index">
          <p class="m-5">{{ h }}</p>
        </p>
      </div>
      <div class="container col-10">
        <div class="row border">
          <div v-for="day in store.weekDays" :key="day" class="col border">
            {{ day }}
          </div>
        </div>
        <p v-for="(row, rowIndex) in store.isFree" :key="rowIndex">
          <div class="container">
            <div class="row">
              <p v-for="(status, colIndex) in row" :key="colIndex" class="col">
                <button 
                  v-if="status === 'szabad'" class="btn btn-dark" @click="store.newPage(store.weekDays[colIndex], store.hours[rowIndex])">{{ status }}</button>
                <button v-else class="btn btn-danger" disabled>{{ status }}</button>
              </p>
            </div>
          </div>
        </p>
      </div>
    </div>
  </div>
</template>