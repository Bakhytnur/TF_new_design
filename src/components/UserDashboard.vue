<template>
  <v-container class="px-0 py-0">
    <v-row no-gutters class="pt-5 text-center">
      <v-col class="justify-center px-5 d-flex flex-column align-center">
        <section style="width: 100%; height: 40vh; overflow: auto">
          <div
            v-if="
              Object.prototype.hasOwnProperty.call(welcomeArticle, 'content')
            "
            id="welcome-article-wp"
            v-html="welcomeArticle.content.rendered"
          />
          <p v-else>Добро пожаловать!</p>
        </section>
      </v-col>
    </v-row>
    <v-row no-gutters class="text-center">
      <v-col
        cols="6"
        class="justify-center px-5 mt-2 d-flex flex-column align-center"
        @click="onWidgetClick('orders')"
      >
        <p class="my-0 text-h5 font-weight-regular" style="color: #2c6df8">
          Заказы
        </p>
        <p
          class="my-0 caption font-weight-regular"
          style="color: #9a9aa8; line-height: 0.9rem"
        >
          Объем ваших покупок в этом месяце
        </p>
      </v-col>

      <v-col
        cols="6"
        class="justify-center px-5 mt-2 d-flex flex-column align-center"
        @click="onWidgetClick('consult')"
      >
        <p class="my-0 text-h5 font-weight-regular" style="color: #2c6df8">
          Консультант
        </p>
        <p
          class="my-0 caption font-weight-regular"
          style="color: #9a9aa8; line-height: 0.9rem"
        >
          Ваш информационный спонсор
        </p>
      </v-col>
    </v-row>

    <v-row style="background-color: #eaf1ff; height: 10px" />

    <v-row no-gutters class="text-center" style="height: 20vh">
      <v-col
        cols="12"
        class="justify-center px-5 d-flex flex-column align-center"
        @click="onWidgetClick('getId')"
      >
        <p class="my-0 text-h5 font-weight-regular" style="color: #2c6df8">
          Получить ID
        </p>
        <p
          class="my-0 caption font-weight-regular"
          style="color: #9a9aa8; line-height: 0.9rem"
        >
          Оставить заявку на вступление в команду 4LIFE
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserDashboard',
  data() {
    return {
      notifyPaidVersion: false
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['welcomeArticle'])
  },
  created() {
    if (!Object.prototype.hasOwnProperty.call(this.welcomeArticle, 'content')) {
      this.$store.dispatch('knowledgeBase/fetchWelcomeArticle')
    }
  },
  methods: {
    onWidgetClick(widgetName) {
      switch (widgetName) {
        case 'consult':
          this.$router.push({ name: 'mySponsor' })
          break
        case 'getId':
          this.$router.push({ name: 'myRequestToJoin' })
          break
        case 'orders':
          this.$router.push({ name: 'myOrders' })
          break
        default:
          break
      }
    }
  }
}
</script>

<style>
#welcome-article-wp img {
  max-width: 100%;
  height: auto;
}
</style>
