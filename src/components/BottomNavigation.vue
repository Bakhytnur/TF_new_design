<template>
  <v-bottom-navigation
    app
    grow
    :value="activeBtn"
    active-class="tf-active-menu-btn"
    background-color="white"
  >
    <v-btn
      id="item-home"
      value="home"
      class="tf-menu-btn"
      @click="$route.name === 'home' || $router.push({ name: 'home' })"
    >
      <span>Мой TF</span>
      <svg
        class="bi bi-bar-chart"
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"
        />
      </svg>
    </v-btn>

    <v-btn
      id="item-catalog"
      class="tf-menu-btn"
      value="catalog"
      @click="$route.name === 'catalog' || $router.push({ name: 'catalog' })"
    >
      <span>Каталог</span>
      <svg
        class="bi bi-card-list"
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
        />
        <path
          fill-rule="evenodd"
          d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
        />
        <circle cx="3.5" cy="5.5" r=".5" />
        <circle cx="3.5" cy="8" r=".5" />
        <circle cx="3.5" cy="10.5" r=".5" />
      </svg>
    </v-btn>

    <v-btn
      id="item-knowledgeBase"
      class="px-6 tf-menu-btn"
      value="knowledgeBase"
      @click="
        $route.name === 'knowledgeBase' ||
          $router.push({ name: 'knowledgeBase' })
      "
    >
      <span>База знаний</span>
      <svg
        class="bi bi-collection-play"
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
        />
        <path
          fill-rule="evenodd"
          d="M6.258 6.563a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"
        />
      </svg>
    </v-btn>

    <v-btn
      id="item-news"
      class="px-2 tf-menu-btn"
      value="news"
      @click="$route.name === 'news' || $router.push({ name: 'news' })"
    >
      <span>Новости</span>

      <v-badge
        v-if="userData.notifyNewNews && !newsAttended"
        color="green"
        dot
        offset-x="0"
        offset-y="5"
      >
        <svg
          class="bi bi-collection"
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
          />
        </svg>
      </v-badge>
      <svg
        v-else
        class="bi bi-collection"
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
        />
      </svg>
    </v-btn>

    <v-btn
      id="item-others"
      class="px-0 tf-menu-btn"
      value="others"
      @click="$route.name === 'others' || $router.push({ name: 'others' })"
    >
      <span>Кабинет</span>
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        class="bi bi-person-square"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
        />
        <path
          fill-rule="evenodd"
          d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
      </svg>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BottomNavigation',
  computed: {
    ...mapState('user', ['userData', 'newsAttended']),
    activeBtn() {
      if (this.$route.name === 'articles' || this.$route.name === 'article') {
        return 'knowledgeBase'
      } else if (this.$route.name === 'catalogItem') {
        return 'catalog'
      } else if (this.$route.name === 'newsItem') {
        return 'news'
      } else if (
        this.$route.name === 'cart' ||
        this.$route.name === 'payment' ||
        this.$route.name === 'paymentState' ||
        this.$route.name === '404' ||
        this.$route.name === 'referralLink' ||
        this.$route.name === 'profile' ||
        this.$route.name === 'visitedProducts' ||
        this.$route.name === 'visitedArticles' ||
        this.$route.name === 'myOrders' ||
        this.$route.name === 'myClientsOrders' ||
        this.$route.name === 'downlineClientOrder' ||
        this.$route.name === 'accountBalance' ||
        this.$route.name === 'downlineLP' ||
        this.$route.name === 'clientsActivities' ||
        this.$route.name === 'mySponsor' ||
        this.$route.name === 'myRequestToJoin' ||
        this.$route.name === 'checkout'
      ) {
        return undefined
      } else {
        return this.$route.name
      }
    }
  }
}
</script>

<style scoped>
.tf-menu-btn {
  height: 100% !important;
}
.tf-menu-btn.tf-active-menu-btn {
  background-color: #3447ed !important;
  color: #fff !important;
}
#item-home:not(.tf-active-menu-btn),
#item-catalog:not(.tf-active-menu-btn),
#item-knowledgeBase:not(.tf-active-menu-btn),
#item-news:not(.tf-active-menu-btn),
#item-others:not(.tf-active-menu-btn) {
  color: #0d0d2f !important;
}
#item-home:not(.tf-active-menu-btn):hover:before,
#item-catalog:not(.tf-active-menu-btn):hover:before,
#item-knowledgeBase:not(.tf-active-menu-btn):hover:before,
#item-news:not(.tf-active-menu-btn):hover:before,
#item-others:not(.tf-active-menu-btn):hover:before {
  opacity: 0;
}
</style>
