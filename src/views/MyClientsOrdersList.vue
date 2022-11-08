<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Заказы покупателей" route="home" />
      <ProgressCircular v-if="isInitialLoading" />
      <section v-else class="px-2" style="width: 100%">
        <section class="mx-auto mt-3" style="max-width: 40rem">
          <div class="justify-center d-flex">
            <ProgressCircular v-if="isOrdersAutoPlacingLoading" :size="40" />
            <v-checkbox
              v-else
              v-model="ordersAutoPlacing"
              class="mt-0 mb-2"
              label="Отправлять напрямую в офис"
              hide-details
              readonly
              @click.stop="changeOrdersAutoPlacing"
            ></v-checkbox>
          </div>

          <div
            class="py-1 text-center rounded-t-lg d-flex flex-column"
            style="background-color: #eceff1"
          >
            <p class="my-0 text-h5 font-weight-bold" style="color: #ffc107">
              {{ newOrders.length }}
            </p>
            <p class="my-0 text-body-1">НОВЫЕ ЗАКАЗЫ</p>
          </div>

          <v-list
            v-if="newOrders.length > 0"
            class="px-3 py-0 mx-auto mb-3 text-center rounded-b-lg"
          >
            <v-list-item
              v-for="newOrder in newOrders"
              :key="newOrder.id"
              dense
              class="px-1 py-1 d-flex justify-space-between"
              style="border-top: 1px solid #eceff1"
              @click="openOrder(newOrder)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                fill="currentColor"
                class="bi bi-exclamation-circle-fill"
                viewBox="0 0 16 16"
                style="color: #ffc107"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>

              <p
                class="px-4 my-0 flex-grow-1 text-start"
                style="color: #2c6df8"
              >
                {{ newOrder.clientName }}
              </p>
              <p class="flex-grow-0 my-0 text-end">
                <span class="text-h6" style="color: #621dd0">
                  {{ newOrder.totalLP }}
                </span>
                <span class="grey--text text-body-2"> LP</span>
              </p>
            </v-list-item>
          </v-list>
        </section>
        <section class="mx-auto mt-6" style="max-width: 40rem">
          <v-btn
            v-if="newOrders.length >= 3 && !showHistoryList"
            outlined
            class="mx-auto d-flex"
            @click="showHistoryList = true"
          >
            История заказов
          </v-btn>

          <section v-else>
            <PeriodPicker
              @change-select="(numberOfMonths) => getOrders(numberOfMonths)"
            />
            <ProgressCircular v-if="isLoading" />
            <v-list
              v-else-if="ordersHistory.length > 0"
              class="px-3 py-0 mx-auto mt-2 mb-3 text-center rounded-lg"
            >
              <v-list-item
                v-for="order in ordersHistory"
                :key="order.id"
                dense
                class="px-1 py-1 d-flex justify-space-between"
                style="border-top: 1px solid #eceff1"
                @click="openOrder(order)"
              >
                <svg
                  v-if="order.status === 'archived'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  fill="currentColor"
                  class="bi bi-x-circle-fill grey--text"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                  />
                </svg>

                <svg
                  v-if="order.status === 'confirmed'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  fill="currentColor"
                  class="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                  style="color: #78d5b8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                  />
                </svg>

                <p
                  class="px-4 my-0 flex-grow-1 text-start"
                  style="color: #2c6df8"
                >
                  {{ order.clientName }}
                </p>

                <p class="flex-grow-0 my-0 text-end">
                  <span class="text-h6" style="color: #621dd0">
                    {{ order.totalLP }}
                  </span>
                  <span class="grey--text text-body-2"> LP</span>
                </p>
              </v-list-item>
            </v-list>
            <p v-else class="mx-auto">Заказы не найдены</p>
          </section>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import PeriodPicker from '@/components/PeriodPicker.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular,
    PeriodPicker
  },
  data() {
    return {
      isLoading: false,
      isInitialLoading: false,
      isOrdersAutoPlacingLoading: false,
      showHistoryList: false,
      ordersAutoPlacing: false
    }
  },
  computed: {
    ...mapState('orders', ['preOrders']),
    ...mapState('user', ['distributorData']),
    newOrders() {
      return this.preOrders.filter((el) => el.status === 'new')
    },
    ordersHistory() {
      return this.preOrders.filter((el) => el.status !== 'new')
    }
  },
  created() {
    if (this.preOrders.length === 0) {
      this.getOrders(0, true)
    }
    this.updateOrdersAutoPlacing()
  },
  mounted() {
    const types = ['ЗаказПокупателя']
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  },
  methods: {
    getOrders(numberOfMonths, initial = false) {
      if (initial) {
        this.isInitialLoading = true
      }
      this.isLoading = true
      this.$store
        .dispatch('orders/getSponsorPreOrdersList', numberOfMonths)
        .finally(() => {
          this.isLoading = false
          this.isInitialLoading = false
        })
    },
    openOrder(order) {
      this.$router.push({
        name: 'downlineClientOrder',
        params: { order, isPreOrder: true, backRoute: 'myClientsOrders' }
      })
    },
    changeOrdersAutoPlacing() {
      this.isOrdersAutoPlacingLoading = true
      const params = {
        ordersAutoPlacing: !this.ordersAutoPlacing
      }
      this.$store
        .dispatch('user/setOrdersAutoPlacing', params)
        .then(() => {
          this.updateOrdersAutoPlacing()
        })
        .finally(() => {
          this.isOrdersAutoPlacingLoading = false
        })
    },
    updateOrdersAutoPlacing() {
      this.ordersAutoPlacing = this.distributorData.ordersAutoPlacing
    }
  }
}
</script>

<style></style>
