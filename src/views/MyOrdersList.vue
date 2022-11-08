<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Мои заказы" route="home" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2 my-4" style="width: 100%">
        <section
          v-for="ordersSection in mainOrders"
          :key="ordersSection.groupDate"
          class="px-2 mx-auto mt-2"
          style="max-width: 40rem"
        >
          <p
            class="py-2 my-1 text-center rounded-lg font-weight-bold"
            style="background-color: #eceff1"
          >
            {{ ordersSection.groupDate }}
          </p>

          <v-list
            class="py-0 mx-auto mb-3 text-center"
            style="background-color: #eaf1ff"
          >
            <v-list-item
              v-for="order in ordersSection.ordersOfDay"
              :key="order.id"
              dense
              class="px-0 py-0 mb-5 d-block"
            >
              <div
                class="py-2 my-0 rounded-t-lg font-weight-bold d-flex flex-column"
                style="background-color: #eceff1"
              >
                <p class="my-0">Заказ №{{ order.id }}</p>

                <p class="my-0" style="color: #2c6df8">
                  {{ order.department }}
                </p>
              </div>

              <div class="rounded-b-lg" style="background-color: #fff">
                <p
                  class="py-2 my-0"
                  style="border-bottom: 1px solid #eceff1; color: #2c6df8"
                >
                  {{ order.clientName ? order.clientName : userData.name }}
                </p>

                <div
                  class="py-2 d-flex justify-space-around"
                  style="border-bottom: 1px solid #eceff1"
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

                  <p class="my-0 text-center">
                    <span class="text-h6" style="color: #2c6df8">
                      {{ order.total }}
                    </span>
                    <span class="grey--text text-body-2"> руб</span>
                  </p>
                  <p class="my-0">
                    <span class="text-h6" style="color: #621dd0">
                      {{ order.totalLP }}
                    </span>
                    <span class="grey--text text-body-2"> LP</span>
                  </p>
                </div>

                <div
                  v-for="orderRow in order.rows"
                  :key="orderRow.productId"
                  class="py-2 d-flex justify-space-between align-center"
                  style="border-top: 1px solid #eceff1"
                  @click="
                    $router.push({
                      name: 'catalogItem',
                      params: { id: orderRow.productId, backRoute: 'myOrders' }
                    })
                  "
                >
                  <v-col cols="6" class="pa-0">
                    <p class="my-0 text-body-2">{{ orderRow.productName }}</p>
                  </v-col>
                  <v-col cols="3" class="pa-0">
                    <p class="my-0">
                      <span class="text-h6">{{ orderRow.quantity }}</span>
                      <span class="grey--text text-body-2"> шт</span>
                    </p>
                  </v-col>
                  <v-col cols="3" class="pa-0">
                    <p class="my-0">
                      <span class="text-h6" style="color: #2c6df8">
                        {{ orderRow.productTotal }}
                      </span>
                      <span class="grey--text text-body-2"> руб</span>
                    </p>
                  </v-col>
                </div>
              </div>
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
    ...mapState('orders', ['mainOrders']),
    ...mapState('catalog', ['products']),
    ...mapState('user', ['userData'])
  },
  created() {
    if (this.mainOrders.length === 0) {
      this.isLoading = true
      this.$store.dispatch('orders/getMainOrdersList').finally(() => {
        this.isLoading = false
      })
    }
    if (this.products.length === 0) {
      this.$store.dispatch('catalog/fetchProducts').finally(() => {})
    }
  }
}
</script>

<style></style>
