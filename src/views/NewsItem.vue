<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="" route="news" class="px-5" />
      <section class="px-3 pt-4" style="width: 100%">
        <ProgressCircular v-if="isLoading" />

        <section
          v-else
          class="pb-4 mx-auto mb-4 rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <p
            class="py-2 my-0 text-center rounded-t-lg text-button font-weight-bold"
            style="background-color: #eceff1"
          >
            Новости
          </p>

          <section class="px-4">
            <p class="mt-2 mb-1 text--secondary">
              {{ newsItem.dateTitle }}
            </p>
            <p
              class="pr-5 mb-2 text-h6 font-weight-bold"
              style="line-height: 1.3rem"
            >
              {{ newsItem.title }}
            </p>
            <div>
              <img
                v-if="newsItem.logo"
                alt="Картинка новости"
                :src="'data:image/jpeg;base64,' + newsItem.logo"
                style="width: 100%; height: 100%; object-fit: cover"
              />
            </div>
            <section id="newsText" v-html="newsItem.content"></section>
          </section>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ProgressCircular from '@/components/ProgressCircular.vue'
import TopNavigation from '@/components/TopNavigation.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('news', ['newsItem'])
  },
  created() {
    this.isLoading = true
    this.$store
      .dispatch('news/getNewsItemById', this.id)
      .then(() => {
        if (!this.newsItem || !this.newsItem.newsId) {
          this.$router.push({ name: '404' })
        } else {
          this.$store.dispatch('news/addAttendedNewsId', this.newsItem.newsId)
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style>
#newsText * {
  width: 100%;
  overflow: hidden;
}
#newsText figure.wp-block-embed-youtube {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
#newsText iframe {
  max-width: 100%;
}
#newsText figure iframe {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
