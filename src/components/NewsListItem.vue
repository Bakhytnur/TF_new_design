<template>
  <v-row style="border-bottom: 1px solid #eceff1" @click="openNewsItem">
    <v-col cols="3" class="flex-grow-0 flex-shrink-0">
      <img
        v-if="item.logo"
        alt="Картинка новости"
        :src="'data:image/jpeg;base64,' + item.logo"
        style="width: 100%; height: 100%; object-fit: cover"
      />
    </v-col>
    <v-col cols="9" class="flex-shrink-0 pl-5 flex-grow-1">
      <p class="py-0 my-0 caption text--secondary">
        <span>{{ item.dateTitle }}</span>
        <v-chip
          v-show="showNewChip()"
          dark
          color="green lighten-1 font-weight-bold"
          small
          class="ml-4"
          >Новое
        </v-chip>
      </p>
      <p class="py-0 mt-0 mb-2 body-2">
        {{ item.title }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NewsListItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('news', ['attendedNewsIds']),
    ...mapState('user', ['userData'])
  },
  methods: {
    showNewChip() {
      const newsAttended = this.attendedNewsIds.find(
        (el) => el === this.item.newsId
      )
      return this.item.date > this.userData.newsLastVisit && !newsAttended
    },
    openNewsItem() {
      this.$router.push({
        name: 'newsItem',
        params: { id: this.item.newsId }
      })
    }
  }
}
</script>

<style></style>
