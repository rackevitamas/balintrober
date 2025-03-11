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
      <tr>
      <th class="border" style="width: 13%;"></th>
      <th class="border">Hétfő</th>
      <th class="border">Kedd</th>
      <th class="border">Szerda</th>
      <th class="border">Csütörtök</th>
      <th class="border">Péntek</th>
    </tr>
    </table>
    <table>
    <tr v-for="h in store.hours">
      <td class="border">{{ h }}</td>
    </tr>
    <tr v-for="[d, h] in store.isFree">
      <td v-if="h == 'szabad'"><p class="btn btn-dark">{{ h }}</p></td>
      <td v-else><button class="btn btn-danger" disabled>{{ h }}</button></td>
    </tr>
    
  </table>
  </div>
</template>
