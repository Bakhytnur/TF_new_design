<template>
  <div class="content-frame">
    <TopNavigation title="Каталог" :use-navigation="false" />
    <section class="catalog">
      <ProgressCircular v-if="isLoading" color="blue" />

      <template v-else>
        <p
          v-if="fetchProductsError"
          class="catalog__error-message font-16-medium"
        >
          {{ fetchProductsError }}
        </p>

        <section
          v-for="category in categories"
          :key="category.id"
          class="catalog__category-container"
        >
          <p class="catalog__category-title font-24-medium">
            {{ category.name }}
          </p>

          <CatalogItemShort
            v-for="product in getProductsByCategory(category)"
            :key="product.productId"
            :item="product"
            @click.native="openProduct(product.productId)"
          />
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CatalogItemShort from '@/components/CatalogItemShort.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import TopNavigation from '@/components/TopNavigation.vue'
export default {
  components: {
    CatalogItemShort,
    ProgressCircular,
    TopNavigation
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('catalog', ['products', 'categories', 'fetchProductsError'])
  },
  created() {
    if (this.products.length === 0) {
      this.isLoading = true
      this.$store.dispatch('catalog/fetchProducts').finally(() => {
        this.isLoading = false
      })
    }
  },
  mounted() {
    const types = ['НовыйТовар']
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  },
  methods: {
    getProductsByCategory(category) {
      return this.products.filter((element) => {
        return element.categoryId === category.id
      })
    },
    openProduct(productId) {
      this.$router.push({
        name: 'catalogItem',
        params: { id: productId }
      })
    }
  }
}
</script>

<style scoped>
.catalog {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
}
.catalog__error-message {
  color: var(--red-1);
}
.catalog__category-container {
  width: 100%;
}
.catalog__category-title {
  color: var(--blue-1);
  text-align: center;
  margin: 30px 30px 20px;
}
</style>
