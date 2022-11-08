<template>
  <v-container style="max-width: 40rem">
    <section>
      <p
        class="py-2 my-0 text-center rounded-t-lg font-weight-bold text-button"
        style="background-color: #eceff1"
      >
        {{ order.date }}
      </p>
      <ProgressCircular v-if="isLoading" />
      <v-list v-else class="py-0 py-2 mx-auto mb-6 text-center rounded-b-lg">
        <v-list-item
          v-for="(row, idx) in order.rows"
          :key="idx"
          class="px-1"
          dense
          @click="
            $router.push({
              name: 'catalogItem',
              params: { id: row.productId, backRoute, backRouteProps }
            })
          "
        >
          <div
            class="d-flex justify-space-between align-center"
            style="width: 100%"
          >
            <v-col cols="6" class="pa-0">
              <p class="my-0 text-body-2">{{ row.productName }}</p>
            </v-col>
            <v-col cols="3" class="pa-0">
              <p class="my-0">
                <span class="text-h6">{{ row.quantity }}</span>
                <span class="grey--text text-body-2"> шт</span>
              </p>
            </v-col>
            <v-col cols="3" class="pa-0">
              <p class="my-0">
                <span class="text-h6" style="color: #2c6df8">
                  {{ row.productTotal }}
                </span>
                <span class="grey--text text-body-2"> руб</span>
              </p>
            </v-col>
          </div>
        </v-list-item>
      </v-list>
    </section>
    <section id="order-input-fields" class="px-8">
      <v-select
        v-model="departmentId"
        :items="userData.departments"
        label="Филиал"
        item-text="departmentName"
        item-value="departmentId"
        :readonly="!isPreOrder || order.status === 'confirmed'"
      ></v-select>

      <v-text-field
        v-for="field in orderFields"
        :key="field.id"
        dense
        type="text"
        :label="field.label"
        readonly
        :value="order[field.id]"
      />

      <v-text-field
        v-model="description"
        dense
        type="text"
        label="Примечание"
        :readonly="!isPreOrder || order.status === 'confirmed'"
      />
    </section>
    <section
      v-if="isPreOrder"
      class="flex-wrap justify-center mx-auto mt-2 d-flex"
    >
      <v-checkbox
        v-model="isDistributorPrice"
        :disabled="order.status === 'confirmed' || order.isDistributorPrice"
        class="mb-2 mt-0"
        label="Цена дистрибьютора"
        hide-details
      ></v-checkbox>

      <v-btn
        width="15rem"
        class="mx-2 mb-2 white--text"
        :loading="confirmLoading"
        :disabled="order.status === 'confirmed'"
        color="#78D5B8"
        @click="confirmOrder"
      >
        Передать в офис
      </v-btn>
      <v-btn
        width="15rem"
        class="white--text"
        :loading="archiveLoading"
        :disabled="order.status === 'archived' || order.status === 'confirmed'"
        color="#78D5B8"
        @click="archiveOrder"
        >Отправить в архив</v-btn
      >
    </section>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
// import OrderRow from '@/components/OrderRow.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  name: 'OrderContent',
  components: {
    // OrderRow,
    ProgressCircular
  },
  props: {
    order: {
      type: Object,
      required: true
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
  data() {
    return {
      orderFields: [
        // { label: 'Филиал', id: 'department' },
        { label: 'Номер телефона', id: 'phoneNumber' },
        { label: 'Дата доставки', id: 'deliveryDate' },
        { label: 'Интервал доставки', id: 'deliveryInterval' },
        { label: 'Адрес доставки', id: 'deliveryAddress' }
        // { label: 'Примечание', id: 'description' }
      ],
      isLoading: false,
      confirmLoading: false,
      archiveLoading: false,
      departmentId: '',
      description: '',
      isDistributorPrice: false
    }
  },
  computed: {
    ...mapState('catalog', ['products']),
    ...mapState('user', ['userData', 'distributorData'])
  },
  created() {
    if (this.products.length === 0) {
      this.isLoading = true
      this.$store.dispatch('catalog/fetchProducts').finally(() => {
        this.isLoading = false
      })
    }
    this.departmentId = this.order.departmentId
    this.description = this.order.description
    if (this.isPreOrder) {
      const currentClient = this.distributorData.allClients.find(
        (el) => el.id === this.order.clientId
      )
      if (this.order.status === 'confirmed') {
        this.isDistributorPrice = this.order.isDistributorPrice
      } else if (this.order.isDistributorPrice) {
        this.isDistributorPrice = true
      } else if (currentClient) {
        this.isDistributorPrice = currentClient.isDistributorPrice
      } else {
        this.isDistributorPrice = false
      }
    }
  },
  methods: {
    confirmOrder() {
      this.confirmLoading = true
      const confirmParams = {
        orderId: this.order.id,
        departmentId: this.departmentId,
        description: this.description,
        isDistributorPrice: this.isDistributorPrice
      }
      this.$store
        .dispatch('orders/confirmOrder', confirmParams)
        .then(async (response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
            await this.$store
              .dispatch('orders/getSponsorPreOrdersList')
              .finally(() => {
                this.$router.push({ name: 'myClientsOrders' })
              })
          }
        })
        .finally(() => (this.confirmLoading = false))
    },
    archiveOrder() {
      this.archiveLoading = true
      this.$store
        .dispatch('orders/archiveOrder', this.order.id)
        .then(async (response) => {
          if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
            await this.$store
              .dispatch('orders/getSponsorPreOrdersList')
              .finally(() => {
                this.$router.push({ name: 'myClientsOrders' })
              })
          }
        })
        .finally(() => (this.archiveLoading = false))
    }
  }
}
</script>

<style>
#order-input-fields .v-input {
  color: #000;
}
#order-input-fields input,
#order-input-fields .v-select__selection {
  color: #2c6df8;
  /* color: #3447ed; */
}
#order-input-fields label {
  color: #000;
  font-size: 1.1rem;
}
#order-input-fields .v-input__slot::before {
  border-bottom-color: #fff;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #fff;
}
</style>
