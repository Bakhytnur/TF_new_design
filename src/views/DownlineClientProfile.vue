<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation
        name="Профиль"
        :route="backRoute"
        :route-props="backRouteProps"
      />
      <section class="px-2 mt-2" style="width: 100%">
        <section class="mx-auto mb-4" style="max-width: 40rem">
          <ProgressCircular v-if="isLoadingClientInfo" />
          <section v-else>
            <UserNameAvatar
              :read-only="true"
              info-source="downlineClient"
              back-route="downlineClientProfile"
              :back-route-props="{ id }"
            />
            <!-- <KPDTab info-source="downlineClient" :client-id="id" /> -->
          </section>

          <ProgressCircular v-if="isLoadingClientOrders" />
          <section v-else>
            <v-list
              v-if="orders.length > 0"
              class="py-0 mx-auto my-3 text-center"
              style="max-width: 40rem; width: 100%"
            >
              <v-list-item
                v-for="order in orders"
                :key="order.id"
                dense
                class="px-0 d-flex justify-space-between"
                @click="openOrder(order)"
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="bi bi-check2-circle blue--text text-start"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
                  />
                </svg>

                <p class="px-4 my-0 text-center flex-grow-1 font-weight-bold">
                  {{ order.total }} руб
                </p>
                <p class="flex-grow-0 my-0 text-end">{{ order.totalLP }} LP</p>
              </v-list-item>
            </v-list>
            <p v-else class="mt-4 text-center text-h6">Заказы не найдены</p>
          </section>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import UserNameAvatar from '@/components/UserNameAvatar.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
// import KPDTab from '@/components/KPDTab.vue'
export default {
  components: {
    TopNavigation,
    UserNameAvatar,
    ProgressCircular
    // KPDTab
  },
  props: {
    id: {
      type: String,
      required: true
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
      isLoadingClientInfo: false,
      isLoadingClientOrders: false
    }
  },
  computed: {
    ...mapState('downlineClient', ['userData', 'orders'])
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
  mounted() {
    const types = ['НовыйПодписчик']
    const objectId = this.id
    this.$store.dispatch('user/setNotificationsAcquaintance', {
      types,
      objectId
    })
  },
  methods: {
    openOrder(order) {
      this.$router.push({
        name: 'downlineClientOrder',
        params: {
          order,
          backRoute: 'downlineClientProfile',
          backRouteProps: { id: this.id }
        }
      })
    }
  }
}
</script>

<style></style>
