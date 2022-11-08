<template>
  <div>
    <TopNavigation title="Авторизация" route="login" />

    <section class="login-phone-form">
      <section class="login-phone-form__container">
        <ValidationObserver v-slot="{ handleSubmit }">
          <div class="login-phone-form__input-group">
            <ValidationProvider
              ref="loginByIdClientIdInput"
              v-slot="v"
              rules="required|min:11|max:16|numeric"
            >
              <input
                id="phone-number"
                v-model="phoneNumber"
                type="text"
                inputmode="numeric"
                required
                class="login-phone-form__input font-16-bold"
                :class="{
                  'login-phone-form__input_invalid': v.invalid && v.validated
                }"
              />
              <label
                for="phone-number"
                class="login-phone-form__label font-20-medium"
              >
                № телефона
              </label>

              <span class="error-message font-12-regular-10">
                {{ v.errors[0] }}
              </span>
            </ValidationProvider>
          </div>

          <div class="login-phone-form__input-group">
            <ValidationProvider v-slot="v" rules="required|min:4|max:4|numeric">
              <input
                id="pin-code"
                v-model="pinCode"
                type="text"
                inputmode="numeric"
                required
                class="login-phone-form__input font-16-bold"
                :class="{
                  'login-phone-form__input_invalid': v.invalid && v.validated
                }"
              />
              <label
                for="pin-code"
                class="login-phone-form__label font-20-medium"
              >
                ПИН-код
              </label>
              <span class="error-message font-12-regular-10">
                {{ v.errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <div class="login-phone-form__button-container">
            <BaseButton1
              class="login-phone-form__button"
              :class="{ 'login-phone-form__button_disabled': isLoading }"
              title="Войти"
              @click="handleSubmit(submit)"
            />
          </div>
        </ValidationObserver>
      </section>

      <MessageBar v-if="showMessage" :message="messageText" />

      <p class="login-phone-form__offer-message font-12-regular-10">
        Нажимая кнопку Войти, вы соглашаетесь с условиями
        <span
          class="login-phone-form__offer-message_blue"
          @click="showOffer = !showOffer"
        >
          оферты </span
        >.
      </p>
      <template v-if="showOffer">
        <div v-html="offer" />
      </template>
    </section>
  </div>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue'
import BaseButton1 from '@/components/base/BaseButton1.vue'
import MessageBar from '@/components/MessageBar.vue'
import { mapState, mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    TopNavigation,
    BaseButton1,
    ValidationObserver,
    ValidationProvider,
    MessageBar
  },
  data() {
    return {
      showOffer: false,
      isLoading: false,
      showMessage: false,
      messageText: '',
      phoneNumber: '',
      pinCode: ''
    }
  },
  computed: {
    ...mapState(['offer']),
    ...mapState('user', ['fetchingUserInfoStatus']),
    ...mapGetters('user', ['isSignedIn'])
  },
  watch: {
    showMessage(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.messageText = ''
          this.showMessage = false
        }, 3000)
      }
    }
  },
  methods: {
    submit() {
      this.isLoading = true
      this.$store
        .dispatch('user/fetchUserInfo', {
          phoneNumber: this.phoneNumber,
          pinCode: this.pinCode
        })
        .then(() => {
          this.isLoading = false
          if (this.isSignedIn) {
            this.$router.push({ name: 'home' })
          } else {
            if (this.fetchingUserInfoStatus.success) {
              this.showMessage = true
              this.messageText = this.fetchingUserInfoStatus.error
            } else {
              this.showMessage = true
              this.messageText = 'Произошла ошибка при обращении к серверу'
            }
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.login-phone-form {
  background: var(--white-1);
  background-image: url('~@/assets/bg-login-right-grey.png'),
    url('~@/assets/bg-login-left-grey.png');
  background-position: right bottom, left bottom;
  background-repeat: no-repeat;
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(100vh - var(--top-nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15px 0;
}
.login-phone-form__container {
  width: 300px;
}
.login-phone-form__input-group {
  position: relative;
  height: 64px;
}
.login-phone-form__label {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--blue-3);
  transition: all 0.5s ease-in-out;
}
.login-phone-form__input {
  border: 0;
  border-bottom: 1px solid var(--gray-1);
  outline: 0;
  color: var(--black-1);
  padding: 0 0 5px 20px;
  width: 100%;
  height: 24px;
}
.login-phone-form__input:focus ~ label,
.login-phone-form__input:valid ~ label {
  left: 10px;
  top: -24px;
  font-size: 16px;
}
.login-phone-form__input_invalid {
  border-bottom: 1px solid var(--red-1);
}
.login-phone-form__input:focus {
  border-bottom: 2px solid var(--blue-3);
}
.login-phone-form__button-container {
  margin-top: 20px;
}
.login-phone-form__button {
  margin: 20px auto;
  width: 100%;
}
.login-phone-form__button_disabled {
  opacity: 0.5;
  pointer-events: none;
}
.error-message {
  color: var(--red-1);
  display: block;
  text-align: center;
  margin-top: 2px;
}
.login-phone-form__offer-message {
  text-align: center;
  margin-bottom: 30px;
}
.login-phone-form__offer-message_blue {
  color: var(--blue-3);
}
</style>
