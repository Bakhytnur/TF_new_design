<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <div
        class="px-8 py-4 my-0 text-h5 font-weight-bold"
        style="width: 100%; background-color: #3447ed; color: white"
      >
        База знаний
      </div>

      <section class="px-3" style="width: 100%">
        <section class="mx-auto" style="max-width: 40rem">
          <div id="kb-search">
            <v-text-field
              v-model="search"
              placeholder="Найти..."
              hide-details
              class="mx-6 mb-6"
            >
              <svg
                slot="append"
                class="mr-2 bi bi-search"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                @click="searchArticles"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </v-text-field>
          </div>

          <section class="mb-4">
            <v-tabs
              id="kb-tabs"
              v-model="tab"
              grow
              centered
              hide-slider
              class="rounded-t-lg"
            >
              <v-tab class="font-weight-bold"> Рубрики </v-tab>
              <v-tab class="font-weight-bold"> Метки </v-tab>
            </v-tabs>

            <ProgressCircular v-if="isLoading" />

            <v-tabs-items
              v-else
              v-model="tab"
              class="rounded-b-lg px-3 py-4"
              style="background-color: #fff"
            >
              <v-tab-item>
                <p class="mx-3 my-2 title" @click="clearCategory()">
                  {{ categories.nameWithCount }}
                </p>
                <v-treeview
                  ref="categoriesTree"
                  class="mx-2"
                  :items="categories.children"
                  item-text="nameWithCount"
                  dense
                  open-all
                  :open-on-click="true"
                >
                  <template #label="{ item, leaf }">
                    <div
                      style="white-space: normal"
                      class="pt-1 pb-2"
                      @click="if (leaf) filterByCategory(item.id, item.name)"
                    >
                      {{ item.nameWithCount }}
                    </div>
                  </template>
                </v-treeview>
              </v-tab-item>
              <v-tab-item class="text-center">
                <v-chip
                  v-for="tagItem in tags"
                  :key="tagItem.id"
                  class="pa-2 ma-1"
                  outlined
                  @click="filterByTag(tagItem.id, tagItem.name)"
                >
                  {{ tagItem.name }}
                </v-chip>
              </v-tab-item>
            </v-tabs-items>
          </section>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    ProgressCircular
  },
  data() {
    return {
      isLoading: false,
      search: '',
      tab: ''
    }
  },
  computed: {
    ...mapState('knowledgeBase', [
      'categories',
      'tags',
      'currentSearch',
      'currentTag',
      'faqArticles'
    ])
  },
  mounted() {
    if (
      !this.categories.children ||
      this.categories.children.length === 0 ||
      this.tags.length === 0
    ) {
      this.isLoading = true
      this.$store
        .dispatch('knowledgeBase/fetchCategoriesAndTags')
        .then(() => {
          if (this.faqArticles.lenght === 0) {
            this.$store.dispatch('knowledgeBase/fetchFAQArticles')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
    this.search = this.currentSearch
  },
  beforeDestroy() {
    this.isLoading = false
  },
  methods: {
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
    clearCategory() {
      const currentFilters = {
        category: undefined,
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
    },
    searchArticles() {
      const currentFilters = {
        category: undefined,
        search: this.search,
        tag: undefined
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
.notActive {
  opacity: 0.5;
}
#kb-tabs .v-tabs-bar .v-tab {
  color: #fff;
  background-color: #78d5b8;
}
#kb-tabs .v-tabs-bar .v-tab--active {
  background-color: #eceff1;
  color: #000;
}
#kb-search .v-input__slot::before {
  border-bottom-color: #fff;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #fff;
}
</style>
