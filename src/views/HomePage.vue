<template>
  <div class="content-frame">
    <DistributorDashboard v-if="isDistributor" />
    <UserDashboard v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DistributorDashboard from '@/components/DistributorDashboard.vue'
import UserDashboard from '@/components/UserDashboard.vue'

export default {
  components: {
    DistributorDashboard,
    UserDashboard
  },
  computed: {
    ...mapGetters('user', ['isDistributor'])
  },
  mounted() {
    this.$store.dispatch('user/getNotificationsList')
  }
}
</script>

<style></style>
