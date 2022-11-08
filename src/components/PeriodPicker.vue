<template>
  <v-select
    v-model="pickedPeriod"
    :hint="pickedPeriod.description"
    :items="monthsVariants"
    item-text="name"
    style="width: 100%; max-width: 30rem"
    class="mx-auto select-period-picker"
    persistent-hint
    return-object
    @change="$emit('change-select', pickedPeriod.numberOfMonths)"
  ></v-select>
</template>

<script>
import { getDateRu } from '@/services/utilities.js'
export default {
  name: 'PeriodPicker',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickedPeriod: { name: 'Весь период', numberOfMonths: 0, description: '' }
    }
  },
  computed: {
    monthsVariants() {
      const dateNow = new Date()
      const date1 = new Date()
      const date2 = new Date()
      const date6 = new Date()
      const date12 = new Date()
      date1.setMonth(date1.getMonth() - 1)
      date2.setMonth(date2.getMonth() - 2)
      date6.setMonth(date6.getMonth() - 6)
      date12.setMonth(date12.getMonth() - 12)
      return [
        { name: 'Весь период', numberOfMonths: 0, description: '' },
        {
          name: 'Последний месяц',
          numberOfMonths: 1,
          description: `${getDateRu(date1)} - ${getDateRu(dateNow)}`
        },
        {
          name: 'Последние два месяца',
          numberOfMonths: 2,
          description: `${getDateRu(date2)} - ${getDateRu(dateNow)}`
        },
        {
          name: 'Последние полгода',
          numberOfMonths: 6,
          description: `${getDateRu(date6)} - ${getDateRu(dateNow)}`
        },
        {
          name: 'Последний год',
          numberOfMonths: 12,
          description: `${getDateRu(date12)} - ${getDateRu(dateNow)}`
        }
      ]
    }
  }
}
</script>

<style>
.select-period-picker .v-messages {
  color: #2c6df8;
  font-size: 0.8rem;
}
</style>
