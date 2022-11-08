<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row v-if="Object.keys(order).length !== 0">
      <TopNavigation name="" :route="backRoute" :route-props="backRouteProps" />

      <div class="justify-center py-4 d-flex align-center" style="width: 100%">
        <div style="width: 100px; height: 100px">
          <img
            v-if="order.clientImage"
            alt="Аватар"
            :src="'data:image/jpeg;base64,' + order.clientImage"
            style="
              border-radius: 50%;
              width: 100%;
              height: 100%;
              object-fit: cover;
            "
          />
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-person-circle grey--text text--lighten-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"
            />
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            />
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-h5">
            {{ order.clientName }}
          </p>
        </div>
      </div>

      <OrderContent
        v-if="!!order"
        :order="order"
        :is-pre-order="isPreOrder"
        back-route="downlineClientOrder"
        :back-route-props="{ isPreOrder, order, backRoute, backRouteProps }"
      />
    </v-row>
  </v-container>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue'
import OrderContent from '@/components/OrderContent.vue'
export default {
  components: {
    TopNavigation,
    OrderContent
  },
  props: {
    order: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isPreOrder: {
      type: Boolean,
      default: false
    },
    backRoute: {
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
  created() {
    if (Object.keys(this.order).length === 0) {
      if (this.backRoute) {
        this.$router.push({ name: this.backRoute, params: this.backRouteProps })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style></style>
