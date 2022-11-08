<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation
        name="Заявка на вступление в 4LIFE"
        route="home"
        :show-logout="false"
      />

      <section
        class="pt-3 px-3 mx-auto text-center"
        style="height: 53vh; overflow: auto"
      >
        <div
          v-if="Object.prototype.hasOwnProperty.call(joinArticle, 'content')"
          v-html="joinArticle.content.rendered"
        />
        <p v-else>Добро пожаловать!</p>
      </section>
    </v-row>
    <v-row no-gutters class="align-self-end">
      <section class="mx-auto mb-2 d-flex flex-column align-center">
        <v-text-field
          ref="phoneNumber"
          v-model="phoneNumber"
          dense
          type="text"
          :prefix="phonePrefix"
          :rules="phoneRules"
          inputmode="numeric"
          label="Номер телефона"
          @focus="onPhoneFocus"
          @blur="onPhoneBlur"
        />
        <p
          v-show="!!requestToJoinStatus.message"
          class="mb-4 text-h6 text-center"
          :class="requestToJoinStatus.isOk ? 'green--text' : 'red--text'"
          style="line-height: 1.5rem"
        >
          {{ requestToJoinStatus.message }}
        </p>
        <v-btn
          width="15rem"
          class="mb-2 white--text"
          :loading="isLoading"
          color="#78D5B8"
          @click="sendRequest"
        >
          Отправить заявку
        </v-btn>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
export default {
  name: 'MyRequestToJoin',
  components: {
    TopNavigation
  },
  data() {
    return {
      isLoading: false,
      phoneNumber: '',
      phonePrefix: '',
      phoneRules: [
        (value) => !!value || 'Введите № телефона',
        (value) =>
          !!value.match(/^\d{11,16}$/) || '№ телефона состоит из 11-16 цифр'
      ]
    }
  },
  computed: {
    ...mapState('user', ['userData', 'requestToJoinStatus']),
    ...mapState('knowledgeBase', ['joinArticle'])
  },
  created() {
    this.phoneNumber = this.userData.phoneNumber
    if (!Object.prototype.hasOwnProperty.call(this.joinArticle, 'content')) {
      this.$store.dispatch('knowledgeBase/fetchJoinArticle')
    }
  },
  methods: {
    sendRequest() {
      if (this.$refs.phoneNumber.validate()) {
        this.isLoading = true
        this.$store
          .dispatch('user/sendRequestToJoin', this.phoneNumber)
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    onPhoneFocus() {
      this.phonePrefix = '+'
    },
    onPhoneBlur() {
      this.phonePrefix = ''
    }
  }
}
</script>

<style></style>
