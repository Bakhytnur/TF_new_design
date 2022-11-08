<template>
  <div>
    <TopNavigation title="Давайте познакомимся" route="login" />

    <section class="signup-form">
      <section class="signup-form__container">
        <ValidationObserver v-slot="{ handleSubmit }">
          <div
            v-for="field in formFieldsFiltered"
            :key="field.name"
            class="signup-form__input-group"
          >
            <ValidationProvider
              ref="loginByIdClientIdInput"
              v-slot="v"
              :rules="field.rules"
            >
              <input
                :id="field.name"
                v-model="field.value"
                :type="field.inputType"
                :inputmode="field.inputMode"
                required
                class="signup-form__input font-16-bold"
                :class="{
                  'signup-form__input_invalid': v.invalid && v.validated
                }"
              />
              <label
                :for="field.name"
                class="signup-form__label font-20-medium"
              >
                {{ field.title }}
              </label>

              <span class="error-message font-12-regular-10">
                {{ v.errors[0] }}
              </span>
            </ValidationProvider>
          </div>

          <div class="signup-form__button-container">
            <BaseButton1
              class="signup-form__button"
              :class="{ 'signup-form__button_disabled': isLoading }"
              title="Получить доступ"
              @click="handleSubmit(submit)"
            />
          </div>
        </ValidationObserver>
      </section>

      <MessageBar v-if="showMessage" :message="messageText" />

      <p class="signup-form__offer-message font-12-regular-10">
        Нажимая кнопку Войти, вы соглашаетесь с условиями
        <span
          class="signup-form__offer-message_blue"
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

  <!-- v-model="redirectToLoginForm" -->
  <!-- Успешная регистрация. Сейчас вы будете перенаправлены на
                страницу входа.
                <v-btn text @click="redirectToLoginForm = false">Перейти</v-btn> -->
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
      redirectToLoginForm: false,
      isLoading: false,
      showMessage: false,
      messageText: '',
      formFields: [
        {
          name: 'phoneNumber',
          title: '№ телефона',
          value: '',
          inputType: 'number',
          inputMode: 'numeric',
          hidden: false,
          rules: 'required|min:11|max:16|numeric'
        },
        {
          name: 'userName',
          title: 'Ваше имя или ФИО',
          value: '',
          inputType: 'text',
          inputMode: 'text',
          hidden: false,
          rules: 'required|alpha_digit'
        },
        {
          name: 'pinCode',
          title: 'Придумайте ПИН-код из 4 цифр',
          value: '',
          inputType: 'number',
          inputMode: 'numeric',
          hidden: false,
          rules: 'required|min:4|max:4|numeric'
        },
        {
          name: 'sponsorId',
          title: 'ID консультанта',
          value: '',
          inputType: 'number',
          inputMode: 'numeric',
          hidden: true,
          rules: 'required|min:7|max:8|numeric'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['referralId', 'signupUserStatus']),
    ...mapState(['offer']),
    ...mapGetters('user', ['isSignedUp']),
    formFieldsFiltered() {
      return this.formFields.filter((el) => !el.hidden)
    }
  },
  watch: {
    showMessage(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.messageText = ''
          this.showMessage = false
        }, 3000)
      }
    },
    redirectToLoginForm(newVal) {
      if (newVal) {
        this.messageText =
          'Успешная регистрация. Сейчас вы будете перенаправлены на страницу входа.'
        this.showMessage = true
        setTimeout(() => {
          this.$router.push({ name: 'loginByPhoneNumber' })
        }, 3500)
      }
    }
  },
  created() {
    this.formFields.find((el) => {
      return el.name === 'sponsorId'
    }).value = this.referralId
  },
  methods: {
    submit() {
      this.isLoading = true
      let fieldsObject = {}
      this.formFields.forEach((element) => {
        fieldsObject[element.name] = element.value
      })
      this.$store
        .dispatch('user/signupUser', fieldsObject)
        .then(() => {
          if (this.isSignedUp) {
            this.redirectToLoginForm = true
          } else {
            if (this.signupUserStatus.success) {
              this.showMessage = true
              this.messageText = this.signupUserStatus.error
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
.signup-form {
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
.signup-form__container {
  width: 300px;
}
.signup-form__input-group {
  position: relative;
  height: 64px;
}
.signup-form__label {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--blue-3);
  transition: all 0.5s ease-in-out;
}
.signup-form__input {
  border: 0;
  border-bottom: 1px solid var(--gray-1);
  outline: 0;
  color: var(--black-1);
  padding: 0 0 5px 20px;
  width: 100%;
  height: 24px;
}
.signup-form__input:focus ~ label,
.signup-form__input:valid ~ label {
  left: 10px;
  top: -24px;
  font-size: 16px;
}
.signup-form__input_invalid {
  border-bottom: 1px solid var(--red-1);
}
.signup-form__input:focus {
  border-bottom: 2px solid var(--blue-3);
}
.signup-form__button-container {
  margin-top: 20px;
}
.signup-form__button {
  margin: 20px auto;
  width: 100%;
}
.signup-form__button_disabled {
  opacity: 0.5;
  pointer-events: none;
}
.error-message {
  color: var(--red-1);
  display: block;
  text-align: center;
  margin-top: 2px;
}
.signup-form__offer-message {
  text-align: center;
  margin-bottom: 30px;
}
.signup-form__offer-message_blue {
  color: var(--blue-3);
}
</style>
