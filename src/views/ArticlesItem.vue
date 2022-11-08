<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="" route="articles" class="px-5" />
      <section class="px-3 pt-4" style="width: 100%">
        <ProgressCircular v-if="isLoading" />

        <section
          v-else
          v-scroll="onScroll"
          class="pb-4 mx-auto mb-4 rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <p
            class="py-3 px-3 my-0 text-center text-button font-weight-bold rounded-t-lg"
            style="background-color: #eceff1; line-height: 1.5rem"
          >
            {{ firstCategoryName }}
          </p>

          <div class="pt-2 pl-5 my-0">
            <p class="mb-0 mt-2 text--secondary">
              {{ article.formatted_date }}
            </p>
            <h3 class="py-0 pr-5 mb-2" v-html="article.title.rendered" />
            <div class="text-center">
              <v-img
                v-if="
                  article._embedded['wp:featuredmedia'] &&
                  article._embedded['wp:featuredmedia'].length > 0
                "
                class="mb-2"
                contain
                max-height="150px"
                max-width="85vw"
                :alt="article._embedded['wp:featuredmedia']['0'].slug"
                :src="article._embedded['wp:featuredmedia']['0'].source_url"
              ></v-img>
            </div>

            <div
              id="articleText"
              class="mx-auto"
              v-html="article.content.rendered"
            ></div>
            <div
              v-if="article._embedded['wp:term']"
              class="my-5 caption font-weight-bold text-uppercase"
            >
              <hr class="mb-2" />
              <div>
                <span class="mr-2">=</span>
                <span
                  v-for="cat in article._embedded['wp:term'][0]"
                  :key="cat.id"
                  class="mr-2 grey lighten-3"
                  @click="filterByCategory(cat.id, cat.name)"
                >
                  {{ cat.name }}
                </span>
                <!-- <span>{{ article.categoriesString }}</span> -->
              </div>
              <div>
                <span class="mr-2">#</span>
                <span
                  v-for="tag in article._embedded['wp:term'][1]"
                  :key="tag.id"
                  class="mr-2 grey lighten-3"
                  @click="filterByTag(tag.id, tag.name)"
                >
                  {{ tag.name }}
                </span>
              </div>
              <hr class="mb-2 mt-1" />
            </div>
          </div>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      percentMax: 0
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['article']),
    firstCategoryName() {
      const allCategories = this.article._embedded['wp:term'][0]
      if (allCategories && allCategories.length > 0) {
        return allCategories[0].name
      }
      return ''
    }
  },
  created() {
    this.isLoading = true
    this.getArticleById(this.id)
      .then(() => {
        if (!this.article || !this.article.id) {
          this.$router.push({ name: '404' })
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  updated() {
    if (!this.isLoading) {
      if (this.article.percentOfRead) {
        const articleTop =
          Math.round(
            (document.documentElement.scrollHeight *
              this.article.percentOfRead) /
              100
          ) - document.documentElement.clientHeight
        document.documentElement.scrollTop = articleTop
      }
    }
  },
  beforeDestroy() {
    if (!this.isLoading) {
      this.setPercentOfRead(this.percentMax)
    }
  },
  methods: {
    ...mapActions('knowledgeBase', ['getArticleById', 'setPercentOfRead']),
    onScroll() {
      const percent = Math.round(
        ((document.documentElement.scrollTop +
          document.documentElement.clientHeight) *
          100) /
          document.documentElement.scrollHeight
      )
      if (percent > this.percentMax) {
        this.percentMax = percent
      }
    },
    shareArticleLink() {
      navigator.clipboard
        .writeText('web+tf:article/' + this.id)
        .then(() => {
          // this.copyResult = 'Ссылка скопирована в буфер.'
          // this.showCopyResult = true
        })
        .catch(() => {
          // this.copyResult = 'Произошла ошибка. ' + (err.response || '')
          // this.showCopyResult = true
        })
    },
    filterByCategory(id, name) {
      const currentFilters = {
        category: { id: id, name: name },
        search: '',
        tag: undefined
      }
      this.$store
        .dispatch('knowledgeBase/setCurrentFilters', currentFilters)
        .then(() => {
          this.$router.push({ name: 'articles' })
        })
    },
    filterByTag(id, name) {
      const currentFilters = {
        category: undefined,
        search: '',
        tag: { id: id, name: name }
      }
      this.$store
        .dispatch('knowledgeBase/setCurrentFilters', currentFilters)
        .then(() => {
          this.$router.push({ name: 'articles' })
        })
    }
  }
}
</script>

<style>
#articleText * {
  width: 100%;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
#articleText figure.wp-block-embed-youtube {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
#articleText iframe {
  max-width: 100%;
}
#articleText figure iframe {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
