<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Спонсор" route="home" :show-logout="false" />

      <section v-if="Object.keys(sponsorData).length > 0" class="mx-auto my-2">
        <section>
          <div style="width: 100px; height: 100px" class="mx-auto">
            <img
              v-if="sponsorData.image"
              alt="Аватар"
              :src="'data:image/jpeg;base64,' + sponsorData.image"
              style="
                border-radius: 50%;
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-person-circle grey--text text--lighten-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"
              />
              <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path
                fill-rule="evenodd"
                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
              />
            </svg>
          </div>
        </section>

        <section class="mb-7">
          <p class="my-0 text-center text-h6" style="line-height: 1.5rem">
            {{ sponsorData.name }}
          </p>
          <p class="mt-1 mb-0 text-center text-body-2">
            {{ sponsorData.departmentName }}
          </p>
        </section>

        <section id="sponsor-input-fields">
          <v-text-field
            v-for="contact in contactInfo"
            :key="contact.name"
            :value="contact.value"
            dense
            readonly
            :label="contact.label"
          />
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue'
import { mapState } from 'vuex'
export default {
  components: {
    TopNavigation
  },
  data() {
    return {
      contactInfo: [
        { name: 'phoneNumber', value: '', label: 'Телефон' },
        { name: 'email', value: '', label: 'Email' },
        { name: 'skype', value: '', label: 'Skype' },
        { name: 'telegram', value: '', label: 'Telegram' },
        { name: 'whatsApp', value: '', label: 'WhatsApp' },
        { name: 'viber', value: '', label: 'Viber' }
      ]
    }
  },
  computed: {
    ...mapState('user', ['sponsorData'])
  },
  created() {
    this.contactInfo.forEach((element) => {
      element.value = this.sponsorData[element.name]
    })
  }
}
</script>

<style>
#sponsor-input-fields .v-input {
  color: #000;
}
#sponsor-input-fields input {
  color: #2c6df8;
  /* color: #3447ed; */
}
#sponsor-input-fields label {
  color: #000;
  font-size: 1.1rem;
}
#sponsor-input-fields .v-input__slot::before {
  border-bottom-color: #fff;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #fff;
}
</style>
