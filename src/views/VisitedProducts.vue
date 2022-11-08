<template>
  <section class="visit-products">
    <div>
      <TopNavigation
        title="Просмотренные продукты"
        :route="backRoute"
        :partnerId="partnerCardId"
        :route-props="backRouteProps"
      />
      <section v-if="visitedProducts" class="visit-products__data">
        <section>
          <PeriodPicker
            @change-select="(numberOfMonths) => getArticles(numberOfMonths)"
          />
          <ProgressCircular v-if="isLoading" />

          <section
            v-else-if="visitedProducts.length > 0"
            class="visit-products__found"
          >
            <ul class="visit-products__list-ul">
              <p class="visit-products__quantity font-16-bold">
                Количество просмотров товаров
              </p>
              <li
                v-for="product in visitedProducts"
                :key="product.productId"
                class="visit-products__list-ul-li"
                @click="openProduct(product.productId)"
              >
                <p class="visit-products__product-name">
                  {{ product.productName }}
                </p>
                <p class="visit-products__counter font-16-bold">
                  {{ product.counter }}
                </p>
              </li>
            </ul>
          </section>
          <p v-else class="visit-products__not-found">Не найдено</p>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PeriodPicker from '@/components/PeriodPicker.vue'
import TopNavigation from '@/components/TopNavigation.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    PeriodPicker,
    TopNavigation,
    ProgressCircular
  },
  props: {
    /*infoSource: {
      type: String,
      default: 'user'
    },*/
    backRoute: {
      type: String,
      default: 'cabinet'
    },
    partnerCardId: {
      type: String,
      default: ''
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
      isLoading: false,
      title: 'Посещения каталога',
      infoSource: 'downlineClient'
      /*visitedProducts: [
        {
          productId: 1,
          counter: 102,
          productName: 'Отчет оценка воздействия 1'
        },
        {
          productId: 2,
          counter: 103,
          productName: 'Отчет оценка воздействия 2'
        }
      ],
      visitedProductsPrepared: [
        {
          id: 1,
          counter: 102,
          title: 'Отчет оценка воздействия 1'
        },
        {
          id: 2,
          counter: 103,
          title: 'Отчет оценка воздействия 2'
        }
      ]*/
    }
  },
  computed: {
    ...mapState('catalog', ['products']),
    visitedProducts() {
      if (this) {
        return this.$store.getters[`${this.infoSource}/visitedProducts`]
      } else {
        return undefined
      }
    }
  },
  created() {
    this.getProducts(0)
  },
  methods: {
    openProduct(id) {
      this.$router.push({
        name: 'catalogItem',
        params: { id }
      })
    },

    getProducts(numberOfMonths) {
      this.isLoading = true
      this.$store
        .dispatch(`${this.infoSource}/getVisitedProducts`, numberOfMonths)
        .then(() => {
          if (this.products.length === 0) {
            this.$store.dispatch('catalog/fetchProducts')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
.visit-products {
  margin-top: 50px;
}
.visit-products__data {
}
.visit-products__found {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column; /*Центрирование по горизонтали*/
}
.visit-products__quantity {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--black-1);
  margin-top: 20px;
  margin-bottom: 20px;
}
.visit-products__list-ul {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  margin-top: 20px;
  width: 100%;
  color: var(--black-1);
}
.visit-products__list-ul-li {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
}
.visit-products__product-name {
  margin-right: 20px;
}
.visit-products__counter {
}
.visit-products__not-found {
  display: flex;
  justify-content: center; /*Центрирование по горизонтали*/
  color: white;
}
</style>
