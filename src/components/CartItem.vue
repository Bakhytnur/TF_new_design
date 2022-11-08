<template>
  <div
    style="border-top: 3px solid #eceff1"
    class="pb-2"
    @click="
      $router.push({
        name: 'catalogItem',
        params: { id: item.productId }
      })
    "
  >
    <v-row
      no-gutters
      justify="space-between"
      class="py-2 align-center"
      style="border-bottom: 1px solid #eceff1"
    >
      <v-col v-if="productImage" cols="3">
        <img
          alt="Картинка товара"
          :src="'data:image/jpeg;base64,' + productImage"
          style="width: 100%; height: 100%; object-fit: cover"
        />
      </v-col>

      <v-col :cols="productImage ? 7 : 10" class="pl-0 text-center">
        <p
          class="my-1 text-body-1 font-weight-bold"
          style="line-height: 1.3rem"
        >
          {{ item.productName }}
        </p>
        <div class="d-flex justify-space-around">
          <p class="my-0">
            <span class="text-h6" style="color: #2c6df8">
              {{ productPrice }}
            </span>
            <span class="grey--text text-body-2"> руб</span>
          </p>
          <p class="my-0">
            <span class="text-h6" style="color: #621dd0">
              {{ productLP }}
            </span>
            <span class="grey--text text-body-2"> LP</span>
          </p>
        </div>
      </v-col>

      <v-col cols="2" class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
          style="color: #000; vertical-align: middle"
          @click.stop="removeItem"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center" class="py-2">
      <div
        class="justify-center mx-2 text-h4 d-flex align-center"
        style="
          border-radius: 50%;
          border: 3px solid #78d5b8;
          width: 1.5em;
          height: 1.5em;
        "
        @click.stop="item.quantity > 1 && decreaseQuantity()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          class="bi bi-dash"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
          />
        </svg>
      </div>

      <div
        class="justify-center mx-1 text-h4 d-flex align-center"
        style="
          border-radius: 50%;
          width: 1.5em;
          height: 1.5em;
          background-color: #aaa;
          color: white;
        "
      >
        <p class="my-0 text-h5">{{ item.quantity }}</p>
      </div>

      <div
        class="justify-center mx-2 text-h4 d-flex align-center"
        style="
          border-radius: 50%;
          border: 3px solid #78d5b8;
          width: 1.5em;
          height: 1.5em;
        "
        @click.stop="increaseQuantity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </div>
    </v-row>

    <v-row no-gutters justify="center">
      <p class="my-0">
        <span class="text-h6" style="color: #2c6df8">
          {{ productPrice * item.quantity }}
        </span>
        <span class="grey--text text-body-2"> руб</span>
      </p>
      <p class="my-0 ml-4">
        <span class="text-h6" style="color: #621dd0">
          {{ productLP * item.quantity }}
        </span>
        <span class="grey--text text-body-2"> LP</span>
      </p>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('catalog', ['cartItems', 'products']),
    ...mapState('user', ['userData']),
    ...mapGetters('user', ['isDistributor']),
    productImage() {
      const product = this.products.find((el) => {
        return el.productId === this.item.productId
      })
      if (product) {
        return product.image
      }
      return ''
    },
    productPrice() {
      const product = this.products.find((el) => {
        return el.productId === this.item.productId
      })
      if (product) {
        return product.price
      }
      return 0
    },
    productLP() {
      const product = this.products.find((el) => {
        return el.productId === this.item.productId
      })
      if (product) {
        return product.LP
      }
      return 0
    }
  },
  methods: {
    removeItem() {
      this.$store.dispatch('catalog/removeItemFromCart', this.item.productId)
    },
    increaseQuantity() {
      this.$store.dispatch('catalog/setItemQuantity', {
        productId: this.item.productId,
        quantity: this.item.quantity + 1
      })
    },
    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.$store.dispatch('catalog/setItemQuantity', {
          productId: this.item.productId,
          quantity: this.item.quantity - 1
        })
      }
    }
  }
}
</script>

<style></style>
