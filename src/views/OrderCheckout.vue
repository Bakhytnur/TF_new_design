<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Подтверждение заказа" route="cart" />
      <section class="px-2 pt-4" style="width: 100%">
        <section v-if="showOrderStatus" class="d-flex flex-column align-center">
          <p class="text-h6 text-center px-4 mt-4">{{ orderMessage }}</p>
          <v-btn
            :to="{ name: 'home' }"
            large
            color="#78D5B8"
            class="mb-3 rounded-lg white--text elevation-0"
            max-width="20rem"
            min-width="15rem"
          >
            <span class="font-weight-bold"> На главную страницу </span>
          </v-btn>
        </section>
        <p v-else-if="cartTotal === 0" class="text-h4 mt-4 text-center">
          Корзина пуста
        </p>
        <v-form
          v-else
          ref="checkoutForm"
          class="white px-4 py-2 mb-3"
          style="width: 100%"
        >
          <v-select
            v-model="departmentId"
            :items="userData.departments"
            label="Филиал"
            item-text="departmentName"
            item-value="departmentId"
          ></v-select>

          <v-text-field
            v-model="phoneNumber"
            :prefix="phonePrefix"
            :rules="phoneRules"
            type="text"
            inputmode="numeric"
            label="№ телефона"
            @focus="onPhoneFocus"
            @blur="onPhoneBlur"
          />

          <v-dialog
            ref="dialog"
            v-model="datePickerModal"
            :return-value.sync="deliveryDate"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="deliveryDate"
                label="Дата доставки"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="deliveryDate"
              scrollable
              show-current
              :first-day-of-week="1"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="datePickerModal = false"
                >Отмена</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(deliveryDate)"
                >ОК</v-btn
              >
            </v-date-picker>
          </v-dialog>

          <v-select
            v-model="deliveryIntervalId"
            :items="userData.deliveryIntervals"
            label="Желаемый интервал доставки"
            item-text="intervalName"
            item-value="intervalId"
          ></v-select>

          <v-text-field
            v-model="deliveryAddress"
            type="text"
            label="Адрес доставки"
          />

          <v-text-field
            v-model="deliveryDescription"
            type="text"
            label="Примечание"
          />
        </v-form>
      </section>
    </v-row>
    <v-row
      v-if="!showOrderStatus"
      no-gutters
      class="align-self-end flex-column"
    >
      <p class="text-h6 mx-auto mb-2 font-weight-bold">
        Сумма заказа: {{ cartTotal }} руб
      </p>
      <v-btn
        :disabled="cartTotal === 0"
        large
        color="#78D5B8"
        class="mb-3 mx-auto rounded-lg white--text elevation-0"
        max-width="20rem"
        min-width="15rem"
        :loading="isLoading"
        @click="placeOrder"
      >
        <span class="font-weight-bold"> Подтвердить </span>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue'
import { mapState } from 'vuex'
export default {
  components: {
    TopNavigation
  },
  data() {
    return {
      showOrderStatus: false,
      isLoading: false,
      departmentId: '',
      phoneNumber: '',
      phonePrefix: '',
      deliveryIntervalId: '',
      deliveryAddress: '',
      deliveryDescription: '',
      datePickerModal: false,
      deliveryDate: new Date().toISOString().substr(0, 10),
      phoneRules: [
        (value) => !!value || 'Введите № телефона',
        (value) =>
          !!value.match(/^\d{11,16}$/) || '№ телефона состоит из 11-16 цифр'
      ]
    }
  },
  computed: {
    ...mapState('catalog', ['cartItems', 'products']),
    ...mapState('orders', ['orderStatus']),
    ...mapState('user', ['userData']),
    cartTotal: function () {
      return this.cartItems.reduce((acc, el) => {
        acc += this.getProductPrice(el.productId) * el.quantity
        return acc
      }, 0)
    },
    orderMessage: function () {
      if (this.orderStatus.success) {
        return `Заказ №${this.orderStatus.orderId} создан. Сотрудник офиса свяжется с вами в ближайшее время.`
      } else if (this.orderStatus.isError) {
        return `Заказ не создан. ${this.orderStatus.error}`
      } else {
        return ''
      }
    }
  },
  created() {
    const mainDep = this.userData.departments.find((el) => {
      return el.departmentId === this.userData.departmentId
    })
    if (mainDep) {
      this.departmentId = mainDep.departmentId
    }
    if (this.userData.phoneNumber) {
      this.phonePrefix = '+'
      this.phoneNumber = this.userData.phoneNumber
    }
    if (this.userData.deliveryIntervals.length > 0) {
      this.deliveryIntervalId = this.userData.deliveryIntervals[0].intervalId
    }
  },
  methods: {
    getProductPrice(productId) {
      const product = this.products.find((el) => {
        return el.productId === productId
      })
      if (product) {
        return product.price
      }
      return 0
    },
    onPhoneFocus() {
      this.phonePrefix = '+'
    },
    onPhoneBlur() {
      if (!this.phoneNumber) {
        this.phonePrefix = ''
      }
    },
    placeOrder() {
      if (this.$refs.checkoutForm.validate()) {
        this.isLoading = true
        this.$store
          .dispatch('orders/placeOrder', {
            departmentId: this.departmentId,
            phoneNumber: this.phoneNumber,
            deliveryDate: this.deliveryDate,
            deliveryIntervalId: this.deliveryIntervalId,
            deliveryAddress: this.deliveryAddress,
            deliveryDescription: this.deliveryDescription
          })
          .then(() => {
            this.showOrderStatus = true
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    goToPayment() {
      this.showDeclineMessage = false
      this.$router.push({ name: 'cabinet', params: { openPaymentTab: true } })
    }
  }
}
</script>

<style></style>
