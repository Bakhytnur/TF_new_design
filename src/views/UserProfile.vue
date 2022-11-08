<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation
        name="Профиль"
        :route="backRoute"
        :route-props="backRouteProps"
        :show-logout="true"
      />

      <section v-if="userData" class="px-2 mt-2" style="width: 100%">
        <section class="mx-auto mb-4" style="max-width: 40rem">
          <UserNameAvatar
            :read-only="readOnly"
            :info-source="infoSource"
            class="mb-8"
          />

          <v-row no-gutters class="px-4 flex-column">
            <v-form
              id="profile-input-fields"
              ref="contactInfoForm"
              :disabled="readOnly"
            >
              <div v-if="contactInfoIsChanged" class="justify-center d-flex">
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="mr-2 bi bi-check"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  color="green"
                  @click="saveContactInfo"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                  />
                </svg>
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="ml-2 bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  color="red"
                  @click="fillContactInfo"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
              <section class="px-6">
                <v-text-field
                  v-for="contact in contactInfo"
                  :key="contact.name"
                  v-model="contact.value"
                  dense
                  type="text"
                  :prefix="contact.type === 'number' ? contact.prefix : ''"
                  :rules="contact.rules"
                  :inputmode="contact.type === 'number' ? 'numeric' : 'text'"
                  :label="contact.title"
                  @focus="onContactFocus(contact.name)"
                  @blur="onContactBlur(contact.name)"
                  @input="contactInfoIsChanged = true"
                />
              </section>

              <v-list class="py-0 rounded-lg">
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%"
                >
                  <div
                    class="justify-center py-3 rounded-t-lg d-flex align-center"
                    style="background-color: #eceff1; width: 100%"
                  >
                    <p
                      class="my-0 mr-2 text-center text-button font-weight-bold"
                    >
                      Информационные спонсоры
                    </p>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-pencil-fill"
                      color="green"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="readOnly || editSponsorList()"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                      />
                    </svg>
                  </div>
                </div>
                <v-list-item
                  v-for="sponsor in userData.infSponsorsList"
                  :key="sponsor.id"
                  dense
                  style="border-top: 1px solid #eceff1"
                >
                  <p class="text-left text-body-2 pa-0 ma-0">
                    {{ sponsor.name }}
                  </p>
                </v-list-item>
              </v-list>
            </v-form>
          </v-row>

          <v-dialog v-model="sponsorDialog" persistent max-width="290">
            <v-card class="px-4">
              <v-card-title class="text-h6">Выберите спонсоров</v-card-title>
              <v-checkbox
                v-for="sponsor in allSponsors"
                :key="sponsor.id"
                v-model="sponsor.checked"
                :label="sponsor.name"
                hide-details
              ></v-checkbox>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="closeDialog(true)"
                  >ОК</v-btn
                >
                <v-btn color="green darken-1" text @click="closeDialog(false)"
                  >Отмена</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar
            v-model="showError"
            :timeout="3000"
            :vertical="true"
            style="position: fixed; top: 0%"
            color="grey darken-3"
          >
            {{ errorMessage }}
            <v-btn text @click="handleSnackbarClick"> Закрыть </v-btn>
          </v-snackbar>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import UserNameAvatar from '@/components/UserNameAvatar.vue'
import TopNavigation from '@/components/TopNavigation.vue'
export default {
  components: {
    UserNameAvatar,
    TopNavigation
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    infoSource: {
      type: String,
      default: 'user'
    },
    backRoute: {
      type: String,
      default: 'cabinet'
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
      sponsorDialog: false,
      showError: false,
      allSponsors: [],
      errorMessage: '',
      contactInfoIsChanged: false,
      contactInfo: [
        {
          name: 'phoneNumber',
          title: 'Телефон',
          value: '',
          type: 'number',
          prefix: '',
          rules: [
            (value) => !!value || 'Введите № телефона',
            (value) =>
              !!value.match(/^\d{11,16}$/) || '№ телефона состоит из 11-16 цифр'
          ]
        },
        {
          name: 'email',
          title: 'Email',
          value: '',
          type: 'string',
          prefix: '',
          rules: [
            (value) =>
              !value ||
              !!value.match(/^[^@]+@[^@]+\.[^@]+$/) ||
              'Указан некорректный email'
          ]
        },
        {
          name: 'skype',
          title: 'Skype',
          value: '',
          type: 'string',
          prefix: '',
          rules: []
        },
        {
          name: 'telegram',
          title: 'Telegram',
          value: '',
          type: 'string',
          prefix: '',
          rules: []
        },
        {
          name: 'whatsApp',
          title: 'WhatsApp',
          value: '',
          type: 'number',
          prefix: '',
          rules: [
            (value) =>
              !value ||
              !!value.match(/^\d{11,16}$/) ||
              '№ WhatsApp состоит из 11-16 цифр'
          ]
        },
        {
          name: 'viber',
          title: 'Viber',
          value: '',
          type: 'number',
          prefix: '',
          rules: [
            (value) =>
              !value ||
              !!value.match(/^\d{11,16}$/) ||
              '№ Viber состоит из 11-16 цифр'
          ]
        }
      ]
    }
  },
  computed: {
    userData() {
      if (this) {
        return this.$store.getters[`${this.infoSource}/userData`]
      } else {
        return undefined
      }
    }
  },
  mounted() {
    this.fillContactInfo()
    this.fillAllSponsors()
  },
  methods: {
    handleSnackbarClick() {
      this.showError = false
      this.errorMessage = ''
    },
    fillContactInfo() {
      this.contactInfo.forEach((element) => {
        element.value = this.userData[element.name]
      })
      this.contactInfoIsChanged = false
    },
    onContactFocus(name) {
      this.contactInfo.forEach((el) => {
        if (el.name === name) {
          el.prefix = '+'
        }
      })
    },
    onContactBlur(name) {
      this.contactInfo.forEach((el) => {
        if (el.name === name) {
          el.prefix = ''
        }
      })
    },
    saveContactInfo() {
      if (this.$refs.contactInfoForm.validate()) {
        const newContactInfo = this.contactInfo.map((element) => {
          return { name: element.name, value: element.value }
        })
        this.$store
          .dispatch('user/saveContactInfo', newContactInfo)
          .then(() => {
            this.contactInfoIsChanged = false
          })
      }
    },
    fillAllSponsors() {
      this.allSponsors = []
      this.userData.parentsList.forEach((elP) => {
        const inList = this.userData.infSponsorsList.find((elS) => {
          return elS.id === elP.id
        })
        this.allSponsors.push({ id: elP.id, name: elP.name, checked: inList })
      })
    },
    editSponsorList() {
      if (this.allSponsors.length > 0) {
        this.sponsorDialog = true
      } else {
        this.errorMessage = 'Нет доступных спонсоров'
        this.showError = true
      }
    },
    closeDialog(saveChanges) {
      if (saveChanges) {
        let newInfSponsors = []
        this.allSponsors.forEach((el) => {
          if (el.checked) {
            newInfSponsors.push({
              id: el.id,
              name: el.name,
              isMainSponsor: false
            })
          }
        })
        const mainSponsor = this.userData.infSponsorsList.find((el) => {
          return el.isMainSponsor
        })
        if (mainSponsor) {
          newInfSponsors.push({
            id: mainSponsor.id,
            name: mainSponsor.name,
            isMainSponsor: true
          })
        }
        this.$store
          .dispatch('user/saveInfSponsors', newInfSponsors)
          .finally(() => {
            this.fillAllSponsors()
            this.sponsorDialog = false
          })
      } else {
        this.fillAllSponsors()
        this.sponsorDialog = false
      }
    }
  }
}
</script>

<style>
#profile-input-fields .v-input {
  color: #000;
}
#profile-input-fields input,
#profile-input-fields .v-select__selection {
  color: #2c6df8;
  /* color: #3447ed; */
}
#profile-input-fields label {
  color: #000;
  font-size: 1.1rem;
}
#profile-input-fields .v-input__slot::before {
  border-bottom-color: #fff;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #fff;
}
</style>
