<template>
  <v-container
    v-scroll="onScroll"
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <div
        class="px-8 py-4 my-0 text-h5 font-weight-bold"
        style="width: 100%; background-color: #3447ed; color: white"
      >
        Новости
      </div>

      <section
        class="px-3 pt-4"
        style="width: 100%"
        :class="{ notActive: isLoading }"
      >
        <section
          class="px-3 py-2 mx-auto mb-4 rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <NewsListItem
            v-for="newsItem in news"
            :key="newsItem.newsId"
            :item="newsItem"
          />
        </section>
      </section>
      <ProgressCircular v-if="isLoading" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import NewsListItem from '@/components/NewsListItem.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    NewsListItem,
    ProgressCircular
  },
  data() {
    return {
      isLoading: false,
      noNewNews: false,
      perPage: 20
    }
  },
  computed: {
    ...mapState('news', ['news'])
  },
  created() {
    if (this.news.length === 0) {
      this.fetchMoreNews()
    }
  },
  mounted() {
    const types = ['НоваяНовость']
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  },
  beforeDestroy() {
    this.noNewNews = true
  },
  methods: {
    needMoreNews() {
      const scrollPos = document.documentElement.scrollTop + window.innerHeight
      return (
        !this.noNewNews &&
        scrollPos * 1.1 >= document.documentElement.offsetHeight
      )
    },
    onScroll() {
      if (this.needMoreNews() && !this.isLoading) {
        this.fetchMoreNews()
      }
    },
    fetchMoreNews() {
      this.isLoading = true
      const newsCount = this.news.length
      this.$store
        .dispatch('news/fetchNews', this.perPage)
        .then(() => {
          this.noNewNews = newsCount + this.perPage > this.news.length

          if (this.needMoreNews()) {
            this.fetchMoreNews()
          }
        })
        .then(() => {
          if (this.news.length > 0) {
            this.$store.dispatch('user/setNewsAttended')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.notActive {
  opacity: 0.5;
}
</style>
