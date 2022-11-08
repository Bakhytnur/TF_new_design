<template>
  <div class="content-frame">
    <TopNavigation
      title="Оплата"
      route="cabinet"
      :route-props="{ openTab: 'payment' }"
    />
    <section class="payment-page">
      <ProgressCircular v-if="isLoading && !showPaymentWidget" />
      <p v-show="showPaymentError">{{ paymentError }}</p>
      <div v-show="showPaymentWidget" id="payment-form"></div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular
  },
  props: {
    variantId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showPaymentWidget: false,
      showPaymentError: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState('payment', ['paymentObject', 'paymentError'])
  },
  created() {
    this.startPayment()
  },
  methods: {
    startPayment() {
      this.isLoading = true
      this.$store
        .dispatch('payment/startPayment', { variantId: this.variantId })
        .then(() => {
          if (
            Object.prototype.hasOwnProperty.call(
              this.paymentObject,
              'confirmation'
            ) &&
            Object.prototype.hasOwnProperty.call(
              this.paymentObject.confirmation,
              'confirmation_token'
            )
          ) {
            const checkout = new window.YooMoneyCheckoutWidget({
              confirmation_token:
                this.paymentObject.confirmation.confirmation_token,
              return_url: `${process.env.VUE_APP_HOST_NAME}/${process.env.BASE_URL}/payment-state`,
              error_callback(error) {
                console.log(error)
              }
            })
            checkout.render('payment-form')
            this.showPaymentWidget = true
            this.showPaymentError = false
          } else {
            this.showPaymentError = true
            this.showPaymentWidget = false
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
.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
</style>
