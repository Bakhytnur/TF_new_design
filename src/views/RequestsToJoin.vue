<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Заявки на вступление в 4LIFE" route="home" />
      <section class="px-2 my-4" style="width: 100%">
        <v-list
          v-if="requestsToJoin.length > 0"
          class="py-2 mx-auto rounded-lg"
          style="max-width: 50rem"
        >
          <v-list-item
            v-for="request in requestsToJoin"
            :key="request.clientId"
            dense
            class="px-0 d-flex justify-space-between"
            style="border-bottom: 1px solid #eceff1"
          >
            <v-col cols="9" class="d-flex align-center">
              <div class="flex-shrink-0 mr-2" style="width: 50px; height: 50px">
                <img
                  v-if="request.clientImage"
                  alt="Аватар"
                  :src="'data:image/jpeg;base64,' + request.clientImage"
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
                  <path
                    fill-rule="evenodd"
                    d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                  />
                </svg>
              </div>

              <div>
                <p class="my-0" style="color: #2c6df8; line-height: 1.2rem">
                  {{ request.clientName }}
                </p>
                <p class="my-0" style="line-height: 1.2rem">
                  {{ formatPhoneNumber(request.phoneNumber) }}
                </p>
                <p class="my-0" style="line-height: 1.2rem">
                  {{ request.createDate }}
                </p>
              </div>
            </v-col>
            <v-col cols="3" class="justify-end pa-0 d-flex align-center">
              <svg
                v-if="request.isNew"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                fill="currentColor"
                class="bi bi-exclamation-circle-fill"
                viewBox="0 0 16 16"
                style="color: #ffc107"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>

              <svg
                v-else-if="request.isComplete"
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                fill="currentColor"
                class="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
                style="color: #78d5b8"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                />
              </svg>

              <svg
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
                class="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                color="grey"
                @click="removeItem(request.clientId)"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </v-col>
          </v-list-item>
        </v-list>
        <p v-else class="mt-10 text-center text-h5">Нет заявок на вступление</p>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
export default {
  components: {
    TopNavigation
  },
  computed: {
    ...mapState('user', ['requestsToJoin'])
  },
  created() {
    this.$store.dispatch('user/setSeenRequestsToJoin')
  },
  mounted() {
    const types = ['ЗаявкаНаВступление']
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  },
  methods: {
    formatPhoneNumber(phoneNumber) {
      let match = phoneNumber.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d+)$/)
      if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
      } else {
        return phoneNumber
      }
    },
    removeItem(clientId) {
      this.$store
        .dispatch('user/requestsToJoinSetNotVisible', clientId)
        .finally(() => {
          this.$store.dispatch('user/getRequestsToJoinList')
        })
    }
  }
}
</script>

<style></style>
