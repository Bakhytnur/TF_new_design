<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation :name="`Заказ ${order.id}`" route="myOrders" />
      <UserNameAvatar />
      <OrderContent
        v-if="!!order"
        :order="order"
        back-route="myOrder"
        :back-route-props="{ id }"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import UserNameAvatar from '@/components/UserNameAvatar.vue'
import OrderContent from '@/components/OrderContent.vue'
export default {
  components: {
    TopNavigation,
    UserNameAvatar,
    OrderContent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      order: {}
    }
  },
  computed: {
    ...mapState('orders', ['mainOrders'])
  },
  created() {
    const tmpId = this.id
    this.mainOrders.forEach((el) => {
      const order = el.ordersOfDay.find((elOrder) => elOrder.id === tmpId)
      if (order) {
        this.order = order
      }
    })
    if (!this.order) {
      this.$router.push({ name: '404' })
    }
  }
}
</script>

<style></style>
