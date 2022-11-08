<template>
  <section class="orders-list">
    <div>
      <TopNavigation
        title="Заказы"
        route="partnerCard"
        :partnerId="partnerCardId"
        route-props="000000002"
      />
      <ul class="orders-list__data-ul">
        <li
          v-for="order in orders"
          :key="order.id"
          class="orders-list__data-ul-li"
        >
          <OrderItem
            :clientName="order.clientName"
            :orderDate="order.date"
            :department="order.department"
            :id="order.id"
            :phoneNumber="order.phoneNumber"
            :total="order.total"
            :totalLP="order.totalLP"
            :rows="order.rows"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import OrderItem from '@/components/OrderItem.vue'
export default {
  components: {
    TopNavigation,
    OrderItem
  },
  props: {
    /*infoSource: {
      type: String,
      default: 'user'
    },*/
    backRoute: {
      type: String,
      default: 'structure-control'
    },
    partnerCardId: {
      type: String,
      default: ''
    },
    backRouteProps: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      isLoading: false,
      title: 'Посещения базы знаний',
      infoSource: 'downlineClient'
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['allArticlesIdTitle']),
    ...mapState('downlineClient', ['userData', 'orders'])
  },
  mounted() {
    this.getArticles(0)
  },
  methods: {}
}
</script>

<style>
.orders-list {
  margin-top: 50px;
}
.orders-list__title {
  display: flex;
  justify-content: center; /*Центрирование по горизонтали*/
  margin-bottom: 20px;
}
.orders-list__data-ul {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  /*margin-left: 30px;*/
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  color: var(--black-1);
}
.orders-list__data-ul-li {
  display: flex;
  padding-top: 20px;

  /*justify-content: center;
  margin-left: 20px;*/
}
</style>
