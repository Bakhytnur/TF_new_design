<template>
  <div>
    <section class="order-item">
      <div class="order-item__id-date font-14-bold">
        <!--p class="order-item__id">
          {{ id }}
        </p-->
        <p class="order-item__subtitle">Дата заказа: {{ orderDate }}</p>
        <span> Total LP: {{ totalLP }} </span>
      </div>
      <div class="order-item__rows">
        <ul class="order-item-list__data-ul">
          <li
            v-for="row in rows"
            :key="row.id"
            class="order-item-list__data-ul-li"
          >
            <p>ID продукта: {{ row.productId }}</p>
            <p>Название продукта: {{ row.productName }}</p>
            <p>Total: {{ row.productTotal }}</p>
            <p>TotaLP: {{ row.productTotalLP }}</p>
            <p>Количество: {{ row.quantity }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    /*infoSource: {
      type: String,
      default: 'user'
    },*/
    clientName: {
      type: String,
      default: ''
    },
    orderDate: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    total: {
      type: String,
      default: ''
    },
    totalLP: {
      type: String,
      default: ''
    },
    rows: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
.order-item {
  display: block;
  /*justify-content: center;*/
  margin-left: 50px;
}
.order-item-list__data-ul {
}
.order-item-list__data-ul-li {
  /*display: flex;
  align-items: center;*/
  width: 300px;
  height: 150px;
  margin-top: 20px;
  padding-left: 20px;
}
</style>
