<template>
  <div
    class="my-2 ml-4 mr-1 rounded-lg d-flex pa-2 align-center elevation-2 justify-space-between"
    style="width: 100%"
    @click="openArticle"
  >
    <div
      class="flex-shrink-0 mr-2 d-flex align-center"
      style="width: 50px; height: 50px"
    >
      <v-img
        height="auto"
        max-width="50px"
        max-height="50px"
        alt="Аватар"
        :src="currentArticle.imageLink"
      >
      </v-img>
    </div>

    <div class="text-center">
      <p class="my-0 text-body-2" style="line-height: 1rem">
        {{ currentArticle.post_title }}
      </p>
      <p class="my-0 blue--text text-caption">открыто в {{ itemData.date }}</p>
    </div>
    <p class="my-0 green--text">{{ itemData.percentOfRead }}%</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['allArticlesIdTitle']),
    currentArticle() {
      return this.allArticlesIdTitle.find((el) => {
        return el.ID === this.itemData.id
      })
    }
  },
  methods: {
    openArticle() {
      this.$router.push({
        name: 'article',
        params: { id: parseInt(this.itemData.id) }
      })
    }
  }
}
</script>

<style></style>
