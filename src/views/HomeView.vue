<script setup>
  import { onMounted } from 'vue';
  import { useAppointmentStore } from '@/stores/appointment';

  const store = useAppointmentStore();

  onMounted(async () => {
    await store.fetchAppointments();
  })

</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="border" style="width: 13%;"></th>
          <th class="border">Hétfő</th>
          <th class="border">Kedd</th>
          <th class="border">Szerda</th>
          <th class="border">Csütörtök</th>
          <th class="border">Péntek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(h, index) in store.hours" :key="index">
          <td class="border">{{ h }}</td>
        </tr>

        <tr v-for="(row, rowIndex) in store.isFree" :key="rowIndex">
          <td v-for="(status, colIndex) in row" :key="colIndex">
            <p v-if="status === 'szabad'" class="btn btn-dark">{{ status }}</p>
            <button v-else class="btn btn-danger" disabled>{{ status }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
