<template>
  <section class="visit-articles">
    <div>
      <TopNavigation
        title="Просмотренные статьи"
        :route="backRoute"
        :partnerId="partnerCardId"
        :route-props="backRouteProps"
      />
      <section v-if="visitedArticles" class="visit-articles__data">
        <section>
          <PeriodPicker
            @change-select="(numberOfMonths) => getArticles(numberOfMonths)"
          />
          <ProgressCircular v-if="isLoading" />

          <section
            v-else-if="visitedArticlesPrepared.length > 0"
            class="visit-articles__found"
          >
            <ul class="visit-articles__list-ul">
              <p class="visit-articles__quantity font-16-bold">
                Количество просмотров статей
              </p>
              <li
                v-for="article in visitedArticlesPrepared"
                :key="article.id"
                class="visit-articles__list-ul-li"
                @click="openArticle(article.id)"
              >
                <p class="visit-articles__title">{{ article.title }}</p>
                <p class="mvisit-articles__counter font-16-bold">
                  {{ article.counter }}
                </p>
              </li>
            </ul>
          </section>
          <p v-else class="visit-articles__not-found">Не найдено</p>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PeriodPicker from '@/components/PeriodPicker.vue'
import TopNavigation from '@/components/TopNavigation.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
export default {
  components: {
    PeriodPicker,
    ProgressCircular,
    TopNavigation
  },
  props: {
    /*infoSource: {
      type: String,
      default: 'user'
    },*/
    backRoute: {
      type: String,
      default: 'cabinet'
    },
    partnerCardId: {
      type: String,
      default: ''
    },
    backRouteProps: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      isLoading: false,
      title: 'Посещения базы знаний',
      infoSource: 'downlineClient'
      /*visitedArticles: [
        {
          id: 1,
          counter: 102,
          title: 'Отчет оценка воздействия 1'
        },
        {
          id: 2,
          counter: 103,
          title: 'Отчет оценка воздействия 2'
        }
      ],
      visitedArticlesPrepared: [
        {
          id: 1,
          counter: 102,
          title: 'Отчет оценка воздействия 1'
        },
        {
          id: 2,
          counter: 103,
          title: 'Отчет оценка воздействия 2'
        }
      ]*/
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['allArticlesIdTitle']),
    visitedArticles() {
      if (this) {
        return this.$store.getters[`${this.infoSource}/visitedArticles`]
      } else {
        return undefined
      }
    },
    visitedArticlesPrepared() {
      let result = []
      this.visitedArticles &&
        this.visitedArticles.forEach((element) => {
          let title = 'Название неизвестно'
          const article = this.allArticlesIdTitle.find((el) => {
            return el.ID === element.articleId
          })
          if (article) {
            title = article.post_title
          }
          result.push({
            id: element.articleId,
            counter: element.counter,
            title
          })
        })
      return result
    }
  },
  mounted() {
    this.getArticles(0)
  },
  methods: {
    openArticle(id) {
      this.$router.push({
        name: 'article',
        params: { id: parseInt(id) }
      })
    },

    getArticles(numberOfMonths) {
      this.isLoading = true
      this.$store
        .dispatch(`${this.infoSource}/getVisitedArticles`, numberOfMonths)
        .then(() => {
          if (this.allArticlesIdTitle.length === 0) {
            this.$store.dispatch('knowledgeBase/fetchAllArticlesIdTitle')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
.visit-articles {
  margin-top: 50px;
}
.visit-articles__data {
  display: block;
  margin: auto;
}
.visit-articles__found {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column; /*Центрирование по горизонтали*/
}
.visit-articles__quantity {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--black-1);
  margin-top: 20px;
  margin-bottom: 20px;
  /*background-color: #eceff1;*/
}
.visit-articles__list-ul {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
  margin-top: 20px;
  width: 100%;
  color: var(--black-1);
  /*background-color: #fff;*/
}
.visit-articles__list-ul-li {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
}
.visit-articles__title {
  margin-right: 20px;
}
.visit-articles__counter {
}
.visit-articles__not-found {
  display: flex;
  justify-content: center; /*Центрирование по горизонтали*/
  color: var(--white-1);
}
</style>
