<template>
  <div class="content-frame">
    <TopNavigation title="Мои показатели" route="home" />
    <section class="indicators">
      <IndicatorItem
        :title="'Лицевой счет ' + '\u20BD'"
        subtitle="Проверьте движение средств"
        :value="'' + distributorData.accountBalance"
      />
      <IndicatorItem
        title="LP"
        subtitle="Объем покупок в текущем месяце"
        :value="distributorData.LP + '/' + distributorData.LPInReport"
      />
      <IndicatorItem
        title="Коэффициент эффективности"
        :subtitle="efficiencySubtitle"
        :value="efficiencyRatio + '%'"
        color-variant="red"
      />
      <section class="indicators__apps">
        <p class="indicators__apps-title font-14-medium-caps">Приложения</p>
        <IndicatorItem
          title="Установлено приложений"
          :value="'' + distributorData.clientsCount"
          :show-border="false"
        />
        <IndicatorItem
          title="Активно приложений"
          :value="'' + distributorData.activeClientsCount"
          :show-border="false"
        />
      </section>
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
    ...mapState('user', ['distributorData']),
    efficiencyRatio() {
      return Math.round(
        (100 * this.distributorData.activeClientsCount) /
          this.distributorData.clientsCount
      )
    },
    efficiencySubtitle() {
      if (this.efficiencyRatio < 33) {
        return 'Низкий КПД – ваши подписчики неохотно интересуются приложением, скорее узнайте у них, в чем заключаются трудности'
      } else if (this.efficiencyRatio < 81) {
        return 'Нормальный КПД. Продолжайте делиться приложением и улучшайте результат, чтобы максимум подписчиков владело ценной информацией и присоединялось к команде!'
      } else {
        return 'Отличный результат! Большинство Ваших подписчиков активно используют приложение, ускоряя Ваш прогресс в построении структуры!'
      }
    }
  }
}
</script>

<style scoped>
.indicators {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  padding: 10px 20px;
}
.indicators__apps {
  margin-top: 20px;
}
.indicators__apps-title {
  color: var(--blue-1);
}
</style>
