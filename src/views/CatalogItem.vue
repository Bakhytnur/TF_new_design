<template>
  <div class="catalog-item-container">
    <TopNavigation
      :title="productCategory"
      :route="backRoute"
      :route-props="backRouteProps"
    />

    <section class="catalog-item">
      <CatalogItemShort :item="item" :cut-bottom-shadow="true" />
      <div class="catalog-item__quantity">
        <IconDashSquare
          class="catalog-item__quantity-button"
          width="40"
          height="40"
          @click.native="quantity > 1 ? quantity-- : (quantity = 1)"
        />
        <span class="catalog-item__quantity-value font-24-regular">
          {{ quantity }}
        </span>
        <IconPlusSquare
          class="catalog-item__quantity-button"
          width="40"
          height="40"
          @click.native="quantity++"
        />
      </div>
      <div class="catalog-item__total font-16-medium">
        <span class="catalog-item__total-sum">
          {{ `${productPrice * quantity} \u20BD` }}
        </span>
        <span class="catalog-item__total-lp">
          {{ item.LP * quantity }} LP
        </span>
      </div>
      <BaseButton1
        class="catalog-item__cart-button"
        title="Добавить в корзину"
        @click="addToCart"
      />
      <p
        v-show="countInCart"
        class="catalog-item__cart-count font-12-medium-caps"
      >
        В корзине: {{ countInCart }}
      </p>
      <section class="catalog-item__description">
        <div v-html="item.description"></div>
      </section>
    </section>
  </div>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue'
import CatalogItemShort from '@/components/CatalogItemShort.vue'
import IconDashSquare from '@/components/icons/IconDashSquare.vue'
import IconPlusSquare from '@/components/icons/IconPlusSquare.vue'
import BaseButton1 from '@/components/base/BaseButton1.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    TopNavigation,
    CatalogItemShort,
    IconDashSquare,
    IconPlusSquare,
    BaseButton1
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    backRoute: {
      type: String,
      default: 'catalog'
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
      quantity: 1
    }
  },
  computed: {
    ...mapState('catalog', ['cartItems', 'categories']),
    ...mapState('user', ['userData']),
    ...mapGetters('user', ['isDistributor']),
    productCategory() {
      return this.categories.find((el) => el.id === this.item.categoryId).name
    },
    productPrice() {
      return this.item.price
    },
    countInCart() {
      const elInCart = this.cartItems.find(
        (el) => el.productId === this.item.productId
      )
      if (elInCart) {
        return elInCart.quantity
      }
      return 0
    }
  },
  created() {
    this.$store.dispatch('catalog/setVisitedProduct', this.item.productId)
  },
  methods: {
    addToCart() {
      if (this.quantity > 0) {
        this.$store.dispatch('catalog/addItemToCart', {
          productId: this.item.productId,
          productName: this.item.productName,
          quantity: this.quantity
        })
      }
    }
  }
}
</script>

<style scoped>
.catalog-item-container {
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
}
.catalog-item {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
}
.catalog-item__quantity {
  display: flex;
  justify-content: center;
  align-items: center;
}
.catalog-item__quantity-value {
  margin: 0 20px;
}
.catalog-item__quantity-button {
  color: var(--blue-3);
}
.catalog-item__total {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.catalog-item__total-sum {
  margin-right: 15px;
  color: var(--blue-1);
}
.catalog-item__total-lp {
  color: var(--blue-3);
}
.catalog-item__cart-button {
  width: 200px;
  margin: 0 auto;
}
.catalog-item__cart-count {
  text-align: center;
  color: var(--gray-1);
  margin-top: 4px;
}
.catalog-item__description {
  margin-top: 20px;
  padding: 0 20px;
}
</style>
