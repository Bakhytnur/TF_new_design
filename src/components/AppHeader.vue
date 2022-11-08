<template>
  <div class="app-header">
    <div class="app-container">
      <nav class="app-header__navbar">
        <span class="font-20-bold">Мой TF</span>
        <ul>
          <li @click="showNotifications">
            <div class="header-icon">
              <IconBell />
              <div
                v-if="notificationCount > 0"
                class="header-icon__notification-badge font-9-bold"
              >
                <span>{{ notificationCount }}</span>
              </div>
            </div>
          </li>
          <li @click="openCart">
            <div class="header-icon">
              <IconCart />
              <div
                v-if="cartCount > 0"
                class="header-icon__cart-badge font-9-bold"
              >
                <span>{{ cartCount }}</span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import IconBell from '@/components/icons/IconBell.vue'
import IconCart from '@/components/icons/IconCart.vue'
import { mapState } from 'vuex'
export default {
  name: 'AppHeader',
  components: {
    IconBell,
    IconCart
  },
  computed: {
    ...mapState('catalog', ['cartItems']),
    ...mapState('user', ['notifications', 'notificationSubscriptionExpire']),
    cartCount() {
      return this.cartItems.reduce((acc, el) => {
        acc += el.quantity
        return acc
      }, 0)
    },
    notificationCount() {
      return (
        this.notifications.new.length +
        (this.notificationSubscriptionExpire.show ? 1 : 0)
      )
    }
  },
  methods: {
    showNotifications() {
      this.$store.commit('SET_NOTIFICATIONS_VIEW', true)
    },
    openCart() {
      this.$route.name === 'cart' || this.$router.push({ name: 'cart' })
    }
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  z-index: 200;
  top: 0;
  width: 100%;
  height: 48px;
  background: var(--blue-1);
  color: var(--white-1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-header__navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
}
.app-header__navbar ul {
  display: flex;
}
.app-header__navbar li {
  list-style: none;
  margin-left: 14px;
}
.header-icon {
  position: relative;
  cursor: pointer;
}
.header-icon__notification-badge {
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background: var(--green-1);
  color: var(--black-1);
  position: absolute;
  left: 12px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-icon__cart-badge {
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background: var(--green-1);
  color: var(--black-1);
  position: absolute;
  left: 7px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
