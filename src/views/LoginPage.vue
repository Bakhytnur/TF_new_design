<template>
  <div class="login-page">
    <div class="login-page__logo-container">
      <img src="@/assets/logo.svg" alt="TF logo" width="150px" />
    </div>
    <div class="login-page__title">
      <p class="font-30-medium-caps">Добро пожаловать</p>
      <p>
        <span class="font-30-medium-caps">в мир</span>
        <span class="font-36-bold"> TF </span>
      </p>
    </div>
    <div class="login-page__button-container">
      <template v-if="referralId">
        <BaseButton2 @click="$router.push({ name: 'signUp', replace: true })">
          Я новичок
        </BaseButton2>

        <BaseButton2
          @click="$router.push({ name: 'loginByPhoneNumber', replace: true })"
        >
          Я зарегистрированный <br />
          пользователь
        </BaseButton2>
      </template>

      <template v-else>
        <BaseButton2
          @click="$router.push({ name: 'loginByID', replace: true })"
        >
          У меня есть ID
        </BaseButton2>

        <BaseButton2
          @click="$router.push({ name: 'loginByPhoneNumber', replace: true })"
        >
          У меня нет ID
        </BaseButton2>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseButton2 from '@/components/base/BaseButton2.vue'
export default {
  components: {
    BaseButton2
  },
  computed: {
    ...mapState('user', ['referralId'])
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  background-image: url('~@/assets/bg-login-right-grey.png'),
    url('~@/assets/bg-login-left-grey.png'), linear-gradient(#2676fc, #621dd0);
  background-position: right bottom, left bottom;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.login-page__logo-container {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40%;
}
.login-page__title {
  color: var(--white-1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
}
.login-page__button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-top: 10%;
}
</style>
