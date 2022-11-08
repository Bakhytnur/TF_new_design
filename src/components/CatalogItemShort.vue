<template>
  <div
    class="catalog-item-short"
    :class="{ 'catalog-item-short_cut-shadow': cutBottomShadow }"
  >
    <div class="catalog-item-short__image-container">
      <img
        v-if="item.image"
        class="catalog-item-short__image"
        alt="Картинка товара"
        :src="'data:image/jpeg;base64,' + item.image"
      />
    </div>

    <section class="catalog-item-short__info-container">
      <p class="font-14-medium-caps">
        {{ item.productName }}
      </p>
      <div class="catalog-item-short__info-price-container font-24-regular">
        <p class="catalog-item-short__info-price">
          {{ `${productPrice} \u20BD` }}
        </p>
        <p class="catalog-item-short__info-LP">{{ item.LP }} LP</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CatalogItemShort',
  props: {
    item: {
      type: Object,
      required: true
    },
    cutBottomShadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapGetters('user', ['isDistributor']),
    productPrice() {
      return this.item.price
    }
  }
}
</script>

<style scoped>
.catalog-item-short {
  padding: 15px 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}
.catalog-item-short_cut-shadow {
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%);
}
.catalog-item-short__image-container {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.catalog-item-short__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.catalog-item-short__info-container {
  flex-grow: 1;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.catalog-item-short__info-price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  width: 100%;
}
.catalog-item-short__info-price {
  color: var(--blue-1);
  margin: 8px 0;
}
.catalog-item-short__info-LP {
  color: var(--blue-3);
}
</style>
