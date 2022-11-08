<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Корзина" route="home" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2 mt-2" style="width: 100%">
        <section
          v-if="verifiedCartItems.length > 0"
          class="pb-2 mx-auto rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <div
            class="d-flex align-center py-3"
            style="background-color: #eceff1"
          >
            <v-col cols="2" class="flex-shrink-0 pa-0"> </v-col>
            <v-col cols="8" class="pa-0">
              <p class="text-center my-0 text-h6 font-weight-bold">
                В корзине: {{ cartCount }}
              </p>
            </v-col>

            <v-col cols="2" class="flex-shrink-0 pa-0">
              <p class="my-0 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                  style="color: #000; vertical-align: middle"
                  @click="clearCart"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </p>
            </v-col>
          </div>

          <CartItem
            v-for="item in verifiedCartItems"
            :key="item.productId"
            :item="item"
          />
        </section>

        <section
          class="my-2 pb-2 mx-auto rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <p
            class="py-3 text-center text-h6 font-weight-bold"
            style="background-color: #eceff1"
          >
            Итоговая сумма
          </p>
          <v-row no-gutters justify="center" class="mb-2">
            <p class="my-0">
              <span class="text-h6" style="color: #2c6df8">
                {{ cartTotal }}
              </span>
              <span class="grey--text text-body-2"> руб</span>
            </p>
            <p class="my-0 ml-4">
              <span class="text-h6" style="color: #621dd0">
                {{ cartTotalLP }}
              </span>
              <span class="grey--text text-body-2"> LP</span>
            </p>
          </v-row>
          <p class="text-center">
            <v-btn
              large
              width="17rem"
              color="#78D5B8"
              class="rounded-lg white--text elevation-0"
              @click="checkout"
            >
              <span class="font-weight-bold"> Оформить заказ </span>
            </v-btn>
          </p>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import CartItem from '@/components/CartItem.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    CartItem,
    TopNavigation,
    ProgressCircular
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('catalog', ['cartItems', 'products']),
    ...mapState('user', ['userData']),
    cartTotal: function () {
      return this.cartItems.reduce((acc, el) => {
        acc += this.getProductPrice(el.productId) * el.quantity
        return acc
      }, 0)
    },
    cartTotalLP: function () {
      return this.cartItems.reduce((acc, el) => {
        acc += this.getProductLP(el.productId) * el.quantity
        return acc
      }, 0)
    },
    cartCount() {
      return this.verifiedCartItems.reduce((acc, el) => {
        acc += el.quantity
        return acc
      }, 0)
    },
    verifiedCartItems: function () {
      return this.cartItems.filter((el) => {
        return !!this.products.find((catEl) => {
          return catEl.productId === el.productId
        })
      })
    }
  },
  created() {
    if (this.products.length === 0) {
      this.isLoading = true
      this.$store.dispatch('catalog/fetchProducts').finally(() => {
        this.isLoading = false
      })
    }
  },
  methods: {
    getProductPrice(productId) {
      const product = this.products.find((el) => {
        return el.productId === productId
      })
      if (product) {
        return product.price
      }
      return 0
    },
    getProductLP(productId) {
      const product = this.products.find((el) => {
        return el.productId === productId
      })
      return product.LP
    },
    clearCart() {
      this.$store.dispatch('catalog/clearCart')
    },
    checkout() {
      this.$router.push({
        name: 'checkout'
      })
    },
    goToPayment() {
      this.showDeclineMessage = false
      this.$router.push({ name: 'cabinet', params: { openPaymentTab: true } })
    }
  }
}
</script>

<style></style>
