<template>
  <div class="content-frame">
    <TopNavigation
      title="Профиль"
      route="structure-control"
      :id="id"
      :phoneNumber="userData.phoneNumber"
      :email="userData.email"
      :userDataId="userData.id"
      :userDataName="userData.name"
      :userDataImage="userData.image"
      :userDataDepartmentName="userData.departmentName"
      :userData="userData"
    />
    <!--section class="partner-card__navigation">
      <div class="partner-card__main-data">
        <div class="partner-card__text">
          <section
            class="partner__open"
            :class="showBorder ? 'partner__open-border' : ''"
            @click="hideFirstFunc"
          >
            <div class="partner__open-icon" v-if="!hideFirst">
              <img src="/../../foto.png" />
            </div>

            <div>
              <p class="partner__open-title font-16-bold">
                {{ userData.name }}
              </p>
              <p class="partner__open-subtitle font-12-regular-10">
                ID: {{ userData.id }}
              </p>
              <p class="partner__open-subtitle font-12-regular">
                Location: {{ userData.id }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </section-->

    <section class="partner-card">
      <div class="partner-card__info">
        <p class="partner-card__contacts font-16-regular-caps">КОНТАКТЫ</p>
        <div class="partner-card__tel font-16-regular-400">
          <img
            src="/../../telephone-svgrepo-com.svg"
            width="25"
            height="20"
            class="partner__card-icon"
          />
          <p class="partner-card__tel-title font-16-regular-400">
            {{ userData.phoneNumber }}
          </p>
        </div>
        <div class="partner-card__email font-16-regular-400">
          <img
            src="/../../email-svgrepo-com.svg"
            width="25"
            height="20"
            class="partner__card-icon"
          />
          <p class="partner-card__email-title font-16-regular-400">
            {{ userData.email }}
          </p>
        </div>
        <div
          @click="
            $router.push({
              name: 'ordersList',
              params: {
                infoSource,
                backRoute: `partnerCard`,
                partnerCardId: id
              },
              backRouteProps: { id: id }
            })
          "
          class="partner-card__orders font-16-regular"
        >
          <!--div
          v-if="!showOrders"
          @click="openOrders"
          class="partner-card__orders font-16-regular"
        -->
          <p class="partner-card__orders-title font-16-regular">
            Заказы
            <img
              src="/../../arrow-right-svgrepo-com.svg"
              width="35"
              height="25"
              class="partner__value-icon"
            />
          </p>
        </div>
        <!--div
          v-if="showOrders"
          @click="closeOrders"
          class="partner-card__orders font-16-regular"
        >
          <p class="partner-card__orders-title font-16-regular">
            Список заказов
            <img
              src="/../../down-arrow-svgrepo-com.svg"
              width="35"
              height="25"
              class="partner__value-icon"
            />
          </p>
        </div-->
      </div>
    </section>
    <section class="partner-card2">
      <p class="partner-card__visits font-16-regular-caps">ПОСЕЩЕНИЯ</p>
      <div
        class="partner-card__knowledge-base font-16-regular"
        @click="
          $router.push({
            name: 'visitedArticles',
            params: { infoSource, backRoute: `partnerCard`, partnerCardId: id },
            backRouteProps: { id: id }
          })
        "
      >
        <!--div
        class="partner-card__knowledge-base font-16-regular"
        @click="
          $router.push(`/visited-articles`)
        "
      -->
        <p class="partner-card__knowledge-base-title font-16-regular">
          База знаний
          <img
            src="/../../arrow-right-svgrepo-com.svg"
            width="35"
            height="25"
            class="partner__value-icon"
          />
        </p>
      </div>
      <div
        class="partner-card__catalog font-16-regular"
        @click="
          $router.push({
            name: 'visitedProducts',
            params: { infoSource, backRoute: `partnerCard`, partnerCardId: id },
            backRouteProps: { id: id }
          })
        "
      >
        <p class="partner-card__catalog-title font-16-regular">
          Каталог
          <img
            src="/../../arrow-right-svgrepo-com.svg"
            width="35"
            height="25"
            class="partner__value-icon"
          />
        </p>
      </div>
    </section>
    <section class="partner-card-efficiency">
      <!--p class="partner-card__indicator">КОЭФФИЦИЕНТ ЭФФЕКТИВНОСТИ</p-->
      <IndicatorItemForPartnerCard
        title="Коэффициент эффективности"
        :value="efficiencyRatio"
        color-variant="blue"
      />
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import IndicatorItemForPartnerCard from '@/components/IndicatorItemForPartnerCard.vue'
//import OrderItem from '@/components/OrderItem.vue'
export default {
  components: {
    TopNavigation,
    IndicatorItemForPartnerCard
    //OrderItem
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    backRoute: {
      type: String,
      default: 'downlineLP'
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
      showCard: false,
      showOrders: false,
      hideFirst: false,
      infoSource: 'downlineClient'
    }
  },
  computed: {
    ...mapState('user', ['distributorData']),
    ...mapState('downlineClient', ['userData', 'orders']),
    ...mapState('user', ['downlineTree']),
    ...mapGetters('user', ['isPaidVersion']),
    /*efficiencyRatio() {
      return Math.round(
        (100 * this.distributorData.activeClientsCount) /
          this.distributorData.clientsCount
      )
    },*/
    efficiencySubtitle() {
      if (this.efficiencyRatio < 33) {
        return 'Низкий КПД – ваши подписчики неохотно интересуются приложением, скорее узнайте у них, в чем заключаются трудности'
      } else if (this.efficiencyRatio < 81) {
        return 'Нормальный КПД. Продолжайте делиться приложением и улучшайте результат, чтобы максимум подписчиков владело ценной информацией и присоединялось к команде!'
      } else {
        return 'Отличный результат! Большинство Ваших подписчиков активно используют приложение, ускоряя Ваш прогресс в построении структуры!'
      }
    },
    distributorData() {
      if (this) {
        return this.$store.getters[`user/distributorData`]
      } else {
        return undefined
      }
    },
    efficiencyRatio() {
      if (
        !this.distributorData ||
        !this.isPaidVersion ||
        this.distributorData.clientsCount < 5
      ) {
        return 0
      } else {
        return Math.round(
          (100 * this.distributorData.activeClientsCount) /
            this.distributorData.clientsCount
        )
        //return Math.floor(Math.random() * 100)
      }
    },
    barPercent() {
      return `${Math.floor(this.efficiencyRatio)}%`
    },
    efficiencyValues() {
      if (this.efficiencyRatio < 33) {
        return {
          barColor: 'red',
          messageColor: 'red--text',
          message:
            'Низкий КПД – ваши подписчики неохотно интересуются приложением, скорее узнайте у них, в чем заключаются трудности'
        }
      } else if (this.efficiencyRatio < 81) {
        return {
          barColor: 'yellow',
          messageColor: 'yellow--text text--darken-3',
          message:
            'Нормальный КПД. Продолжайте делиться приложением и улучшайте результат, чтобы максимум подписчиков владело ценной информацией и присоединялось к команде!'
        }
      } else {
        return {
          barColor: 'green',
          messageColor: 'green--text',
          message:
            'Отличный результат! Большинство Ваших подписчиков активно используют приложение, ускоряя Ваш прогресс в построении структуры!'
        }
      }
    },
    hideFirstWindow() {
      switch (this.j) {
        case 1:
          return 1
        case 2:
          return 2
        case 3:
          return 3
        default:
          return 1
      }
    }
  },
  created() {
    if (this.id) {
      this.isLoadingClientInfo = true
      this.isLoadingClientOrders = true
      this.$store
        .dispatch('downlineClient/getDownlineClientInfo', this.id)
        .finally(() => {
          this.isLoadingClientInfo = false
        })
      this.$store
        .dispatch('downlineClient/getDownlineClientOrders', this.id)
        .finally(() => {
          this.isLoadingClientOrders = false
        })
    } else {
      this.$router.push({ name: '404' })
    }
  },
  methods: {
    openCard() {
      this.showCard = true
      this.j = this.j + 1
    },
    closeCard() {
      this.showCard = false
    },
    openOrders() {
      this.showOrders = true
    },
    closeOrders() {
      this.showOrders = false
    }
  }
}
</script>

<style scoped>
.partner-card {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  /*min-height: calc(var(--content-height) - var(--top-nav-height));*/
  padding: 10px 20px;
  height: 250px;
  padding-top: 20px;
  z-index: 1;
  align-items: center;
}
.partner-card2 {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  /*min-height: calc(var(--content-height) - var(--top-nav-height));*/
  padding: 10px 20px;
  height: 250px;
  padding-top: 20px;
  z-index: 2;
  align-items: center;
  margin-top: -60px;
}
.partner-card__contacts {
  margin-bottom: 20px;
  color: var(--blue-1);
}
.partner-card__tel {
  display: flex;
}
.partner-card__tel-title {
  margin-bottom: 20px;
  padding-right: 20px;
}
.partner-card__email {
  display: flex;
}
.partner-card__email-title {
  margin-bottom: 30px;
  padding-right: 20px;
}
.partner-card__orders-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 35px;
  width: 100%;
  align-items: center;
  padding-left: 20px;
}
.partner-card__orders {
  display: flex;
  justify-content: space-between;
}
.partner-card__orders-open-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 35px;
  width: 100%;
  align-items: center;
  padding-left: 20px;
}
.partner-card__orders-open {
  display: flex;
  justify-content: space-between;
}
.partner-card__visits {
  margin-bottom: 20px;
  color: var(--blue-1);
}
.partner-card__knowledge-base-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 35px;
  width: 100%;
  align-items: center;
  padding-left: 20px;
}
.partner-card__knowledge-base {
  display: flex;
  justify-content: space-between;
}
.partner-card__catalog-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 35px;
  width: 100%;
  align-items: center;
  padding-left: 20px;
}
.partner-card__catalog {
  display: flex;
  justify-content: space-between;
}
.partner__card-icon {
  margin-right: 20px;
}
.partner-card-efficiency {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  padding: 10px 20px;
  padding-top: 20px;
  z-index: 3;
  margin-top: -70px;
  color: var(--blue-1);
}

.partner-card__navigation {
  /*display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;*/
  /*padding: 10px 0;*/
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  color: var(--black-1);
}
.partner-card__main-data {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  padding: 10px 0;
  /*margin-left: 20px;
  margin-right: 20px;*/
  color: var(--white-1);
}
.partner-card__text {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.partner__open {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*padding: 10px 0;*/
  color: var(--black-1);
}
.partner__open-icon {
  margin-right: 25px;
  width: 84px;
  height: 84px;
}
.partner__open-title {
  width: 75px;
  color: var(--white-1);
  margin-bottom: 5px;
}
.partner__open-subtitle {
  color: var(--white-1);
  margin-bottom: 5px;
}
.line {
  border-bottom: 1px solid var(--gray-1);
  margin-top: 2px;
}
</style>
