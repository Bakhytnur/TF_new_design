<template>
  <v-card class="py-2 my-1" width="100%">
    <v-row v-if="!!product" no-gutters class="align-center">
      <v-col v-if="!!product.image" cols="3">
        <v-img
          class="mx-auto text-center"
          contain
          max-height="10rem"
          max-width="10rem"
          alt="Изображение товара"
          :src="'data:image/png;base64,' + product.image"
        ></v-img>
      </v-col>
      <v-col :cols="!!product.image ? 9 : 12">
        <p class="my-0 font-weight-bold">{{ product.productName }}</p>
        <p class="my-0">
          Количество: <span class="red--text">{{ orderRow.quantity }}</span>
        </p>
        <p class="my-0">
          {{ orderRow.productTotal }} руб / {{ orderRow.productTotalLP }} LP
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OrderRow',
  props: {
    orderRow: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('catalog', ['products']),
    product() {
      return this.products.find(
        (el) => el.productId === this.orderRow.productId
      )
    }
  }
}
</script>

<style></style>
