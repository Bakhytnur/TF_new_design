<template>
  <div class="subscription">
    <div class="subscription__title-container">
      <p class="subscription__title font-16-regular-caps">
        {{ item.name }}
      </p>
    </div>
    <div class="border"></div>
    <div class="subscription__container">
      <section class="subscription__data">
        <p class="subscription__cost font-20-bold">
          {{ `${item.cost} \u20BD` }}
        </p>
        <p class="subscription__duration font-14-regular-caps">
          <template v-if="isTrustPayment">
            <span>
              {{ item.duration }}
            </span>
            <span>
              {{ getDaysString(item.duration) }}
            </span>
          </template>

          <template v-else>
            <span>
              {{ item.numberOfMonths }}
            </span>
            <span>
              {{ getMonthsString(item.numberOfMonths) }}
            </span>
          </template>
        </p>
      </section>
      <div class="subscription__button">
        <BaseButton1 :title="buttonHeader" @click="startPayment" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton1 from '@/components/base/BaseButton1.vue'
import { periodNames, getPeriodString } from '@/services/utilities.js'
export default {
  name: 'SubscriptionsItem',
  components: {
    BaseButton1
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isTrustPayment: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonHeader() {
      return this.isTrustPayment ? 'Подключить' : 'Оплатить'
    }
  },
  methods: {
    startPayment() {
      this.$emit('pick-variant', this.item.id)
    },
    getDaysString(num) {
      return getPeriodString(num, periodNames.day)
    },
    getMonthsString(num) {
      return getPeriodString(num, periodNames.month)
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid var(--gray-1);
  margin: 16px 0 0;
}
.subscription {
  padding: 20px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--white-1);
  color: var(--black-1);
  height: 170px;
}
.subscription__title-container {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.subscription__title {
  text-align: center;
}
.subscription__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}
.subscription__data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}
.subscription__duration {
  color: var(--gray-1);
  margin-top: 10px;
}
</style>
