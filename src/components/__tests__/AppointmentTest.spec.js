import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { mount } from '@vue/test-utils'
import { useAppointmentStore } from '@/stores/appointment'

describe('Appointment', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Az adatok le van-e kérve', () => {
    const store = useAppointmentStore()
    expect(store.fetchAppointments.length).toBeGreaterThan(0)
  })
})
