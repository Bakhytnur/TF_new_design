<template>
  <div
    class="faq-article font-14-regular"
    :class="{ 'faq-article_active': shortSectionActivated && shortVariant }"
  >
    <section v-if="shortVariant" class="article-short" @click="openItem">
      <span>{{ item.title }}</span>
      <IconChevronRight
        class="control-icon"
        :class="{ 'control-icon_open': !shortVariant }"
      />
    </section>

    <section v-else class="article-full">
      <div class="icon-container">
        <IconChevronRight
          class="control-icon control-icon_open"
          @click.native="shortVariant = true"
        />
      </div>

      <div v-html="renderedContent" />
    </section>
  </div>
</template>

<script>
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
export default {
  name: 'FAQItem',
  components: {
    IconChevronRight
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shortVariant: true,
      shortSectionActivated: false
    }
  },
  computed: {
    renderedContent() {
      if (this.item.content) {
        return this.item.content.rendered
      } else {
        return ''
      }
    }
  },
  watch: {
    shortSectionActivated(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.shortSectionActivated = false
        }, 500)
      }
    }
  },
  methods: {
    openItem() {
      if (this.item.content) {
        this.shortVariant = false
      } else {
        this.shortSectionActivated = true
        this.$store
          .dispatch('knowledgeBase/fetchFAQArticleContent', this.item.id)
          .then(() => {
            this.shortVariant = false
          })
      }
    }
  }
}
</script>

<style scoped>
.faq-article {
  padding: 0 15px 0 20px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--white-1);
  color: var(--black-1);
}
.faq-article_active {
  background: var(--green-1);
}

.article-short {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  padding: 10px 0;
}
.article-full {
  padding: 16px 0;
}
.icon-container {
  text-align: right;
}
.control-icon {
  color: var(--gray-1);
  transform: rotate(90deg);
  flex-shrink: 0;
  margin-left: 20px;
}
.control-icon_open {
  transform: rotate(-90deg);
}
</style>
