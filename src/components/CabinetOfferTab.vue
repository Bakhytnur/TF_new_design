<template>
  <section class="offer">
    <div v-html="offer" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['offer'])
  }
}
</script>

<style scoped>
.offer {
  padding: 0 30px;
}
</style>
