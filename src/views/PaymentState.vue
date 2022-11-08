<template>
  <div class="content-frame content-container">
    <section class="payment-state">
      <p class="payment-state__title font-16-regular-caps">Статус платежа</p>

      <ProgressCircular v-if="isLoading" color="blue" />
      <p v-else class="payment-state__status font-16-medium">
        {{ paymentStatusVerbose }}
      </p>

      <div class="payment-state__button-container">
        <BaseButton1
          class="payment-state__button"
          title="На главную страницу"
          @click="$router.push({ name: 'home' })"
        />
        <BaseButton1
          class="payment-state__button"
          title="Обновить статус"
          @click="getPaymentStatus"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProgressCircular from '@/components/ProgressCircular.vue'
import BaseButton1 from '@/components/base/BaseButton1.vue'
export default {
  components: {
    ProgressCircular,
    BaseButton1
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState('payment', ['paymentStatus']),
    paymentIsOver() {
      return (
        this.paymentStatus === 'succeeded' || this.paymentStatus === 'canceled'
      )
    },
    paymentStatusVerbose() {
      switch (this.paymentStatus) {
        case 'pending':
          return 'Не оплачен. Ожидается оплата.'
        case 'succeeded':
          return 'Платеж успешно завершен.'
        case 'waiting_for_capture':
          return 'Оплачен. Ожидается списание.'
        case 'canceled':
          return 'Платеж отменен.'
        default:
          return 'Сведения о платеже отсутствуют.'
      }
    }
  },
  created() {
    this.getPaymentStatus()
  },
  methods: {
    getPaymentStatus() {
      this.isLoading = true
      this.$store
        .dispatch('payment/getPaymentStatus')
        .then(() => {
          if (this.paymentStatus === 'succeeded') {
            this.$store.dispatch('user/getClientBillingStatus').then(() => {
              this.$router.push({
                name: 'cabinet',
                params: { openTab: 'payment' }
              })
            })
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.payment-state {
  margin: 50px 20px;
  padding: 30px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--white-1);
  color: var(--black-1);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.payment-state__title {
  color: var(--blue-1);
  align-self: flex-start;
}
.payment-state__status {
  text-align: center;
}
.payment-state__button-container {
  width: 100%;
}
.payment-state__button {
  display: block;
  margin-top: 10px;
  width: 100%;
}
</style>
