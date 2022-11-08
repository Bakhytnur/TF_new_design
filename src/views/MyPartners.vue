<template>
  <div class="content-frame">
    <TopNavigation title="Покупатели без ID" route="home" />
    <section class="partners">
      <IndicatorItem
        title="Заказы покупателей"
        subtitle="Смотрите покупки ваших партнеров"
        :value="'' + distributorData.ordersCount"
      />
      <IndicatorItem
        title="Активность покупателей"
        subtitle="Проверьте, насколько активны ваши партнеры"
        :value="'' + activities.new.length"
      />
      <IndicatorItem
        title="Заявки на вступление"
        subtitle="Проверьте, кто из ваших подписчиков хочет присоединиться к команде"
        :value="'' + newRequestsToJoin"
        :show-border="false"
        color-variant="green"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import IndicatorItem from '@/components/IndicatorItem.vue'
export default {
  components: {
    TopNavigation,
    IndicatorItem
  },
  computed: {
    ...mapState('user', ['distributorData', 'requestsToJoin']),
    ...mapState('downlineClient', ['activities']),
    newRequestsToJoin() {
      return this.requestsToJoin.filter((el) => {
        return el.isNew
      }).length
    }
  },
  mounted() {
    if (this.activities.old.length === 0 && this.activities.new.length === 0) {
      this.$store.dispatch('downlineClient/getActivities')
    }
  }
}
</script>

<style scoped>
.partners {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  padding: 10px 20px;
}
</style>
