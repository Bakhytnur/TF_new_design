<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Лицевой счёт" route="home" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2" style="width: 100%">
        <section class="py-2 mx-auto" style="max-width: 40rem">
          <div
            style="background-color: #eceff1"
            class="pt-3 pb-4 mt-3 text-center rounded-t-lg"
          >
            <p class="my-0" style="line-height: 1rem">
              <span class="text-h5 font-weight-bold" style="color: #2c6df8">
                {{ distributorData.accountBalance }}
              </span>
              <span class="grey--text text-body-1"> руб </span>
            </p>
            <p
              class="my-0 text-button font-weight-bold"
              style="line-height: 1rem"
            >
              Текущий баланс
            </p>
          </div>
          <v-list class="pt-4 mx-auto mb-3 text-center rounded-b-lg">
            <v-list-item
              v-for="transaction in accountTransactions"
              :key="transaction.id"
              dense
              class="px-4 mb-2 d-flex justify-space-between"
              style="border-bottom: 1px solid #eee"
              @click="openOrder(transaction.orderId)"
            >
              <svg
                v-if="transaction.direction === '+'"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-plus-circle-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style="color: #2c6df8"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                />
              </svg>
              <svg
                v-if="transaction.direction === '-'"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-dash-circle-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style="color: #621dd0"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                />
              </svg>
              <div class="pb-2 mx-4 text-left flex-grow-1">
                <p class="my-0 font-weight-bold">
                  {{ transaction.operationType }}
                </p>
                <p class="my-0 text-body-2" style="line-height: 1rem">
                  {{ `№${transaction.documentId} от ${transaction.date}` }}
                </p>
              </div>
              <p class="my-0 d-flex align-center">
                <span
                  class="text-h6"
                  :style="
                    transaction.total >= 0 ? 'color: #2c6df8' : 'color: #621dd0'
                  "
                  >{{
                    `${transaction.total > 0 ? '+' : ''}${transaction.total}`
                  }}
                </span>
                <span class="ml-1 grey--text text-body-2">руб</span>
              </p>
            </v-list-item>
          </v-list>
        </section>
      </section>
    </v-row>
  </v-container>
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
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('user', ['accountTransactions', 'distributorData']),
    ...mapState('orders', ['mainOrders'])
  },
  created() {
    if (this.accountTransactions.length === 0) {
      this.isLoading = true
      this.$store.dispatch('user/getAccountTransactions').finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted() {
    const types = ['ПоступлениеНаЛС']
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  },
  methods: {
    openOrder(orderId) {
      if (orderId) {
        if (this.mainOrders.length === 0) {
          this.isLoading = true
          this.$store.dispatch('orders/getMainOrdersList').finally(() => {
            this.isLoading = false
            this.$router.push({
              name: 'myOrder',
              params: { id: orderId }
            })
          })
        } else {
          this.$router.push({
            name: 'myOrder',
            params: { id: orderId }
          })
        }
      }
    }
  }
}
</script>

<style></style>
