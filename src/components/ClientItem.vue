<template>
  <div
    style="border-bottom: 1px solid #eceff1; width: 100%"
    @click="openClientProfile(itemData.id)"
  >
    <ProgressCircular v-if="isLoading" :size="90" />
    <section v-else class="py-1 mb-2 d-flex text-body-2 align-center">
      <div class="flex-shrink-0 mr-2" style="width: 50px; height: 50px">
        <img
          v-if="itemData.image"
          alt="Аватар"
          :src="'data:image/jpeg;base64,' + itemData.image"
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
      <div>
        <p class="my-0">
          <span class="blue--text">{{ itemData.name }}</span>
          <span> зарегистрирован {{ itemData.firstLogin }}</span>
        </p>
        <p class="my-0">последнее посещение {{ itemData.lastLogin }}</p>
        <v-checkbox
          v-model="discount"
          class="mt-0 mb-2"
          label="Скидка"
          hide-details
          readonly
          @click.stop="changeDiscount"
        ></v-checkbox>
      </div>
    </section>
  </div>
</template>

<script>
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  name: 'ClientItem',
  components: {
    ProgressCircular
  },
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      discount: false
    }
  },
  created() {
    this.updateDiscount()
  },
  methods: {
    updateDiscount() {
      this.discount = this.itemData.isDistributorPrice
    },
    openClientProfile(clientId) {
      this.$router.push({
        name: 'downlineClientProfile',
        params: {
          id: clientId,
          backRoute: 'clientsActivities',
          backRouteProps: { openTab: 1 }
        }
      })
    },
    changeDiscount() {
      this.isLoading = true
      const discountParams = {
        userId: this.itemData.id,
        isDiscount: !this.discount
      }
      this.$store
        .dispatch('user/setUserDiscount', discountParams)
        .finally(() => {
          this.updateDiscount()
          this.isLoading = false
        })
    }
  }
}
</script>

<style></style>
