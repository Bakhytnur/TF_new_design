<template>
  <v-container
    v-scroll="onScroll"
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="" route="knowledgeBase" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2 mt-2" style="width: 100%">
        <section
          v-if="!initialFetchInProgress"
          class="pb-2 mx-auto rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <p
            class="py-3 px-3 my-0 text-center text-button font-weight-bold"
            style="background-color: #eceff1; line-height: 1.5rem"
          >
            {{ currentFilter }}
          </p>

          <ArticleListItem
            v-for="article in articles"
            :key="article.id"
            :is-loading="isLoading"
            :item="article"
          />
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import ArticleListItem from '@/components/ArticleListItem.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    TopNavigation,
    ArticleListItem,
    ProgressCircular
  },
  data() {
    return {
      initialFetchInProgress: true,
      isLoading: false,
      noNewArticles: false,
      page: 1
    }
  },
  computed: {
    ...mapState('knowledgeBase', [
      'articles',
      'currentSearch',
      'currentCategory',
      'currentTag'
    ]),
    currentFilter() {
      if (this.currentCategory.id && this.currentCategory.id !== 0) {
        return `Рубрика: ${this.currentCategory.name}`
      } else if (this.currentSearch) {
        return `Поиск: ${this.currentSearch}`
      } else if (this.currentTag.id && this.currentTag.id !== 0) {
        return `Метка: ${this.currentTag.name}`
      }
      return 'Отборы не установлены'
    }
  },
  created() {
    this.fetchMoreArticles()
  },
  beforeDestroy() {
    this.noNewArticles = true
  },
  methods: {
    needMoreArticles() {
      const scrollPos = document.documentElement.scrollTop + window.innerHeight
      return (
        !this.noNewArticles &&
        scrollPos * 1.2 >= document.documentElement.offsetHeight
      )
    },
    onScroll() {
      if (this.needMoreArticles()) {
        this.fetchMoreArticles()
      }
    },
    fetchMoreArticles() {
      this.isLoading = true
      const articlesCount = this.page === 1 ? 0 : this.articles.length
      this.$store
        .dispatch('knowledgeBase/fetchArticles', this.page++)
        .then(() => {
          this.noNewArticles = articlesCount === this.articles.length

          if (this.needMoreArticles()) {
            this.fetchMoreArticles()
          }
        })
        .finally(() => {
          this.isLoading = false
          this.initialFetchInProgress = false
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
