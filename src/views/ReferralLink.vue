<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Реферальная ссылка" route="home" />
      <section class="px-3 pt-4" style="width: 100%">
        <section
          class="pt-2 pb-8 mx-auto text-center rounded-lg"
          style="max-width: 40rem; background-color: #fff"
        >
          <div style="max-width: 200px" class="mx-auto">
            <img
              v-if="distributorData.referralQRCode"
              alt="QR код"
              :src="'data:image/jpeg;base64,' + distributorData.referralQRCode"
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>

          <p class="text-center text-h6">
            {{ referralLink }}
          </p>

          <v-snackbar
            v-model="showCopyResult"
            :timeout="4000"
            :vertical="true"
            style="position: fixed; top: 0%"
            color="grey darken-3"
          >
            {{ copyResult }}
            <v-btn text @click="showCopyResult = false">Закрыть</v-btn>
          </v-snackbar>

          <div class="mx-auto" style="width: 15rem">
            <v-btn
              block
              large
              color="#78D5B8"
              class="rounded-lg white--text elevation-0"
              @click="copyRefLinkToClipboard"
            >
              <span class="font-weight-bold"> Копировать </span>
            </v-btn>
            <v-btn
              block
              large
              class="mt-3 rounded-lg white--text elevation-0"
              color="#78D5B8"
              @click="shareLink"
              ><span class="font-weight-bold"> Поделиться </span>
            </v-btn>
          </div>

          <v-bottom-sheet v-model="sheetShare">
            <v-sheet
              class="text-center d-flex justify-space-around align-center"
              height="100px"
            >
              <ShareNetwork
                v-for="network in networks"
                :key="network.key"
                :network="network.network"
                :url="referralLink"
                :title="sharing.title"
                class="flex-grow-1"
              >
                <i :class="network.icon" :style="{ color: network.color }"></i>
              </ShareNetwork>
            </v-sheet>
          </v-bottom-sheet>
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
      showCopyResult: false,
      copyResult: '',
      sheetShare: false,
      sharing: {
        title: 'Присоединяйтесь к TF:'
      },
      networks: [
        {
          network: 'twitter',
          name: 'Twitter',
          icon: 'fab fa-twitter fa-3x',
          color: '#1da1f2'
        },
        {
          network: 'viber',
          name: 'Viber',
          icon: 'fab fa-viber fa-3x',
          color: '#59267c'
        },
        {
          network: 'vk',
          name: 'Vk',
          icon: 'fab fa-vk fa-3x',
          color: '#4a76a8'
        },
        {
          network: 'whatsapp',
          name: 'Whatsapp',
          icon: 'fab fa-whatsapp fa-3x',
          color: '#25d366'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['distributorData', 'userData']),
    referralLink: function () {
      return `${process.env.VUE_APP_HOST_NAME}${process.env.BASE_URL}?r=${this.userData.id4Life}`
    }
  },
  methods: {
    copyRefLinkToClipboard() {
      navigator.clipboard
        .writeText(this.referralLink)
        .then(() => {
          this.copyResult = 'Ссылка скопирована в буфер.'
          this.showCopyResult = true
        })
        .catch((err) => {
          this.copyResult = 'Произошла ошибка. ' + (err.response || '')
          this.showCopyResult = true
        })
    },
    shareLink() {
      if (navigator.share) {
        navigator
          .share({
            title: 'TF',
            text: 'Присоединяйтесь к TF:',
            url: this.referralLink
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error))
      } else {
        this.sheetShare = true
      }
    }
  }
}
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: #424242;
  font-size: 2rem;
}
</style>
