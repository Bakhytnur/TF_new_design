<template>
  <v-overlay z-index="10" @click.native="hideNotifications">
    <v-sheet
      color="white"
      height="90vh"
      width="80vw"
      class="py-2 mx-auto rounded-lg"
      light
    >
      <p class="mb-4 text-center text-button font-weight-bold">Уведомления</p>
      <section style="overflow: auto; height: 90%">
        <p
          v-if="notificationSubscriptionExpire.show"
          class="px-6 pb-4 my-0 text-body-2 red--text"
          @click.stop="goToPayment"
        >
          {{ notificationSubscriptionExpire.text }}
        </p>
        <p
          v-for="(notification, idx) in notifications.new"
          :key="`new${idx}`"
          class="px-6 py-4 my-0 text-body-2"
          style="background-color: #c6f6d8; border-bottom: 1px solid #888"
          @click.stop="goToNotificationRoute(notification)"
        >
          {{ notification.name }}
        </p>
        <p
          v-for="(notification, idx) in notifications.old"
          :key="`old${idx}`"
          class="px-6 py-4 my-0 text-body-2"
          style="border-top: 1px solid #888"
          @click.stop="goToNotificationRoute(notification)"
        >
          {{ notification.name }}
        </p>
      </section>
    </v-sheet>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NotificationsList',
  computed: {
    ...mapState('user', ['notifications', 'notificationSubscriptionExpire'])
  },
  methods: {
    hideNotifications() {
      this.$store.commit('SET_NOTIFICATIONS_VIEW', false)
    },
    goToPayment() {
      this.$store.commit('SET_NOTIFICATIONS_VIEW', false)
      this.$route.name === 'cabinet' ||
        this.$router.push({ name: 'cabinet', params: { openPaymentTab: true } })
    },
    goToNotificationRoute(notification) {
      this.$store.commit('SET_NOTIFICATIONS_VIEW', false)
      switch (notification.type) {
        case 'ПрочтениеСтатьиБЗ':
        case 'ПрочтениеКарточкиТовара':
        case 'ПрочтениеНовостей':
          if (this.$route.name === 'clientsActivities') {
            const types = [
              'ПрочтениеСтатьиБЗ',
              'ПрочтениеКарточкиТовара',
              'ПрочтениеНовостей'
            ]
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'clientsActivities' })
          }
          break
        case 'ОшибкаСозданияЗаказа':
          this.$store.dispatch('user/setNotificationsAcquaintance', {
            types: ['ОшибкаСозданияЗаказа']
          })
          this.$route.name === 'cabinet' ||
            this.$router.push({
              name: 'cabinet',
              params: { openPaymentTab: true }
            })
          break
        case 'ЗаказПокупателя':
          if (this.$route.name === 'myClientsOrders') {
            const types = ['ЗаказПокупателя']
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'myClientsOrders' })
          }
          break
        case 'ЗаявкаНаВступление':
          if (this.$route.name === 'requestsToJoin') {
            const types = ['ЗаявкаНаВступление']
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'requestsToJoin' })
          }
          break
        case 'НоваяНовость':
          if (this.$route.name === 'news') {
            const types = ['НоваяНовость']
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'news' })
          }
          break
        case 'НовыйТовар':
          if (this.$route.name === 'catalog') {
            const types = ['НовыйТовар']
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'catalog' })
          }
          break
        case 'ПоступлениеНаЛС':
          if (this.$route.name === 'accountBalance') {
            const types = ['ПоступлениеНаЛС']
            this.$store.dispatch('user/setNotificationsAcquaintance', { types })
          } else {
            this.$router.push({ name: 'accountBalance' })
          }
          break
        case 'НовыйПодписчик':
          if (this.$route.name === 'downlineClientProfile') {
            const types = ['НовыйПодписчик']
            const objectId = notification.objectId
            this.$store.dispatch('user/setNotificationsAcquaintance', {
              types,
              objectId
            })
          } else {
            this.$router.push({
              name: 'downlineClientProfile',
              params: {
                id: notification.objectId,
                backRoute: 'home'
              }
            })
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style></style>
