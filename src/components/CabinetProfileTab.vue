<template>
  <div class="client-profile">
    <UserNameAvatar back-route="cabinet" class="content-container" />
    <section class="visits">
      <div class="content-container">
        <p class="visits__title font-16-regular-caps">Посещения</p>
        <BaseButton2 class="visits__button"> База знаний </BaseButton2>
        <BaseButton2 class="visits__button"> Каталог </BaseButton2>
      </div>
    </section>

    <section class="contacts">
      <div class="content-container">
        <ValidationObserver v-slot="{ handleSubmit }">
          <div class="contacts__header">
            <p class="contacts__title font-16-regular-caps">Контакты</p>
            <div v-show="contactsBlured" class="contacts__buttons">
              <IconCheck
                class="contacts__button-submit"
                width="24"
                height="24"
                @click.native="handleSubmit(saveContacts)"
              />
              <IconX
                class="contacts__button-reset"
                width="20"
                height="20"
                @click.native="fillContactInfo"
              />
            </div>
          </div>
          <div
            v-for="contact in contacts"
            :key="contact.name"
            class="contact-group font-16-medium"
          >
            <component
              :is="contact.iconComponent"
              class="contact-group__icon"
            />
            <ValidationProvider v-slot="v" :rules="contact.rules">
              <input
                v-model="contact.value"
                :type="contact.inputType"
                :inputmode="contact.inputMode || 'text'"
                class="contact-group__input font-16-medium"
                :class="{
                  'contact-group__input_invalid':
                    v.invalid && v.validated && contactsBlured
                }"
                @input="contactsBlured = true"
              />
              <span class="error-message font-12-regular-10">
                {{ v.errors[0] }}
              </span>
            </ValidationProvider>
          </div>
        </ValidationObserver>
      </div>
    </section>

    <section class="inf-sponsors">
      <div class="content-container">
        <p class="inf-sponsors__title font-16-regular-caps">
          Информационные спонсоры
        </p>
        <ClientCard
          v-for="sponsor in userData.infSponsorsList"
          :key="sponsor.id"
          :client="sponsor"
          class="inf-sponsors__item"
        />
      </div>
    </section>
    <section class="logout">
      <div class="content-container">
        <BaseButton1
          class="logout__button"
          title="Выйти из приложения"
          @click="logOut"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClientCard from '@/components/ClientCard.vue'
import UserNameAvatar from '@/components/UserNameAvatar.vue'
import BaseButton1 from '@/components/base/BaseButton1.vue'
import BaseButton2 from '@/components/base/BaseButton2.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconEmail from '@/components/icons/IconEmail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconSkype from '@/components/icons/IconSkype.vue'
import IconTelegram from '@/components/icons/IconTelegram.vue'
import IconViber from '@/components/icons/IconViber.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconX from '@/components/icons/IconX.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'CabinetProfileTab',
  components: {
    UserNameAvatar,
    ClientCard,
    BaseButton1,
    BaseButton2,
    IconPhone,
    IconEmail,
    IconWhatsapp,
    IconSkype,
    IconTelegram,
    IconViber,
    IconTwitter,
    IconCheck,
    IconX,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      contacts: [
        {
          name: 'phoneNumber',
          iconComponent: 'IconPhone',
          value: '',
          inputType: 'text',
          inputMode: 'numeric',
          rules: 'required|min:11|max:16|numeric'
        },
        {
          name: 'email',
          iconComponent: 'IconEmail',
          value: '',
          inputType: 'text',
          rules: 'email'
        },
        {
          name: 'whatsApp',
          iconComponent: 'IconWhatsapp',
          value: '',
          inputType: 'text',
          inputMode: 'numeric',
          rules: 'min:11|max:16|numeric'
        },
        {
          name: 'skype',
          iconComponent: 'IconSkype',
          value: '',
          inputType: 'text'
        },
        {
          name: 'telegram',
          iconComponent: 'IconTelegram',
          value: '',
          inputType: 'text'
        },
        {
          name: 'viber',
          iconComponent: 'IconViber',
          value: '',
          inputType: 'text',
          inputMode: 'numeric',
          rules: 'min:11|max:16|numeric'
        },
        {
          name: 'twitter',
          iconComponent: 'IconTwitter',
          value: '',
          inputType: 'text'
        }
      ],
      contactsBlured: false
    }
  },
  computed: {
    ...mapState('user', ['userData'])
  },
  mounted() {
    this.fillContactInfo()
  },
  methods: {
    fillContactInfo() {
      this.contacts.forEach((element) => {
        element.value = this.userData[element.name]
      })
      this.contactsBlured = false
    },
    saveContacts() {
      const contacts = this.contacts.map((element) => {
        return { name: element.name, value: element.value }
      })
      this.$store.dispatch('user/saveContactInfo', contacts).then(() => {
        this.contactsBlured = false
      })
    },
    logOut() {
      this.$store.dispatch('user/performLogOut')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.client-profile {
  padding-top: 10px;
}
.visits {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 24px 24px 0px 0px;
  margin-top: 30px;
  padding: 30px 20px;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%);
}
.visits__title {
  color: var(--blue-1);
}
.visits__button {
  margin-top: 20px;
  width: 100%;
}
.contacts {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 24px 24px 0px 0px;
  padding: 30px 20px;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%);
}
.contacts__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.contacts__title {
  color: var(--blue-1);
  margin-bottom: 24px;
}
.contact-group {
  position: relative;
  height: 48px;
}
.contact-group__icon {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--blue-3);
}
.contact-group__input {
  border: 0;
  border-bottom: 1px solid var(--gray-1);
  outline: 0;
  color: var(--black-1);
  padding: 0 0 5px 24px;
  width: 100%;
  height: 24px;
}
.contact-group__input_invalid {
  border-bottom: 1px solid var(--red-1);
}
.contact-group__input:focus {
  border-bottom: 2px solid var(--blue-3);
}
.contacts__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
}
.contacts__button-submit {
  color: var(--green-2);
}
.contacts__button-submit:active {
  transform: scale(0.8);
}
.contacts__button-reset {
  color: var(--red-1);
}
.contacts__button-reset:active {
  transform: scale(0.8);
}
.error-message {
  color: var(--red-1);
  display: block;
  text-align: center;
  margin-top: 2px;
}
.inf-sponsors {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 24px 24px 0px 0px;
  padding: 30px 20px;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 100%);
}
.inf-sponsors__title {
  color: var(--blue-1);
}
.inf-sponsors__item {
  margin-top: 20px;
  width: 100%;
}
.logout {
  padding: 30px 20px;
}
.logout__button {
  width: 100%;
}
</style>
