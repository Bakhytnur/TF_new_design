<template>
  <div
    class="my-2 ml-4 mr-1 rounded-lg d-flex pa-2 align-center elevation-2 justify-space-between"
    style="width: 100%"
    @click="openProduct"
  >
    <div
      class="flex-shrink-0 mr-2 d-flex align-center"
      style="width: 50px; height: 50px"
    >
      <v-img
        height="auto"
        max-width="50px"
        max-height="50px"
        alt="Аватар"
        :src="
          currentProduct.image
            ? 'data:image/jpeg;base64,' + currentProduct.image
            : '#'
        "
      >
      </v-img>
    </div>

    <div class="text-center flex-grow-1">
      <p class="my-0 text-body-2" style="line-height: 1rem">
        {{ currentProduct.productName }}
      </p>
      <p class="my-0 blue--text text-caption">
        просмотрено в {{ itemData.date }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('catalog', ['products']),
    currentProduct() {
      return this.products.find((el) => {
        return el.productId === this.itemData.id
      })
    }
  },
  methods: {
    openProduct() {
      this.$router.push({
        name: 'catalogItem',
        params: { id: this.itemData.id, backRoute: 'clientsActivities' }
      })
    }
  }
}
</script>

<style></style>
