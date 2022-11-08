<template>
  <div class="client-payment">
    <section
      class="subscription-info font-16-medium"
      :class="{ 'subscription-info_red': !subscriptionInfo.status }"
    >
      <p class="subscription-info__content">
        {{ subscriptionInfoContent }}
      </p>
    </section>

    <MessageBar v-if="trustPaymentFailed" :message="trustPaymentError" />

    <ProgressCircular
      v-if="isLoading"
      color="blue"
      class="subscriptions__progress"
    />
    <section v-else-if="!isUserTrustPaymentPeriod" class="subscriptions">
      <p class="subscriptions__title font-16-regular-caps">Варианты подписки</p>

      <SubscriptionsItem
        v-if="!subscriptionInfo.status && isAvailableUserTrustPayment"
        class="subscriptions-item"
        :is-trust-payment="true"
        :item="trustPaymentItem"
        @pick-variant="handleTrustPaymentPick"
      />
      <SubscriptionsItem
        v-for="subscritpionItem in subscriptions"
        :key="subscritpionItem.id"
        class="subscriptions-item"
        :item="subscritpionItem"
        @pick-variant="
          (variantId) => {
            $router.push({ name: 'payment', params: { variantId } })
          }
        "
      />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SubscriptionsItem from '@/components/SubscriptionsItem.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import MessageBar from '@/components/MessageBar.vue'
export default {
  name: 'CabinetPaymentTab',
  components: {
    SubscriptionsItem,
    ProgressCircular,
    MessageBar
  },
  data() {
    return {
      isLoading: false,
      trustPaymentFailed: false,
      trustPaymentError: ''
    }
  },
  computed: {
    ...mapState('payment', ['subscriptions', 'trustPayment']),
    ...mapState('user', ['subscriptionInfo']),
    ...mapGetters('user', [
      'isUserTrustPaymentPeriod',
      'isAvailableUserTrustPayment',
      'isPaidVersion'
    ]),
    trustPaymentItem() {
      return {
        name: 'Обещанный платеж',
        cost: this.trustPayment.cost,
        duration: this.trustPayment.duration
      }
    },
    subscriptionInfoContent() {
      let result = this.isPaidVersion ? 'Бизнес версия' : 'Бесплатная версия'
      if (this.subscriptionInfo.status) {
        result += ` — подписка до ${this.subscriptionInfo.expirationDate}`
      } else if (this.subscriptionInfo.trustPaymentStatus) {
        result += ` — обещанный платеж до ${this.subscriptionInfo.trustPaymentEndDate}`
      }
      return result
    }
  },
  created() {
    if (this.subscriptions.length === 0) {
      this.fetchSubscriptions()
    }
  },
  methods: {
    fetchSubscriptions() {
      this.isLoading = true
      this.$store.dispatch('payment/getSubscriptions').finally(() => {
        this.isLoading = false
      })
    },
    async handleTrustPaymentPick() {
      this.isLoading = true
      const result = await this.$store.dispatch('payment/activateTrustPayment')
      if (result.data.isError) {
        this.trustPaymentError = result.data.error
        this.trustPaymentFailed = true
      } else {
        await this.$store.dispatch('user/getClientBillingStatus')
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.client-payment {
  padding-top: 10px;
}
.subscription-info {
  margin-bottom: 30px;
  color: var(--black-1);
}
.subscription-info__content {
  text-align: center;
}
.subscription-info_red {
  color: var(--red-1);
}
.subscriptions {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 24px 24px 0px 0px;
  padding: 30px 20px;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%);
}
.subscriptions__progress {
  margin: 0 auto;
}
.subscriptions__title {
  color: var(--blue-1);
}
.subscriptions-item {
  margin-top: 40px;
}
</style>
