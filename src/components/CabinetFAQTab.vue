<template>
  <div>
    <ProgressCircular v-if="isLoading" color="blue" class="faq-progress" />
    <section v-else class="faq">
      <div class="content-container">
        <FAQItem
          v-for="article in faqArticles"
          :key="article.id"
          :item="article"
          class="faq__item"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProgressCircular from '@/components/ProgressCircular.vue'
import FAQItem from '@/components/FAQItem.vue'
export default {
  name: 'CabinetFAQTab',
  components: {
    ProgressCircular,
    FAQItem
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['faqArticles'])
  },
  created() {
    if (this.faqArticles.length === 0) {
      this.fetchfaqArticles()
    }
  },
  methods: {
    fetchfaqArticles() {
      this.isLoading = true
      this.$store.dispatch('knowledgeBase/fetchFAQArticles').finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.faq-progress {
  margin: 0 auto;
}
.faq {
  padding: 0 20px;
}
.faq__item {
  margin-top: 10px;
}
</style>
