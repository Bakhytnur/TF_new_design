<template>
  <div class="dashboard">
    <section class="dashboard__main">
      <DepartmentIconTitle
        :department-name="userData.departmentName"
        color="white"
      />

      <section class="dashboard__referal-link">
        <div class="dashboard__referal-link-top">
          <img
            v-if="distributorData.referralQRCode"
            alt="QR code"
            :src="'data:image/png;base64,' + distributorData.referralQRCode"
          />
          <p class="dashboard__referal-link-url font-10-regular">
            {{ referralLink }}
          </p>
        </div>
        <BaseButton1
          font-class="font-12-regular"
          title="Копировать ссылку"
          @click="copyRefLinkToClipboard"
        />
        <BaseButton1
          font-class="font-12-regular"
          title="Поделиться ссылкой"
          @click="shareLink"
        />
      </section>
    </section>

    <section class="dashboard__links">
      <BaseButton2 @click="$router.push({ name: 'indicators' })">
        Мои показатели
      </BaseButton2>
      <BaseButton2 @click="$router.push({ name: 'structure-control' })">
        Контроль структуры
      </BaseButton2>
      <BaseButton2 @click="$router.push({ name: 'myPartners' })">
        Покупатели без ID
      </BaseButton2>
    </section>
    <MessageBar
      v-if="notifyPaidVersion"
      message="Доступно в бизнес версии приложения."
      :show-button="true"
      button-title="Перейти к оплате"
      @button-click="goToPayment"
    />

    <MessageBar v-if="showMessage" :message="messageText" />

    <!-- distributorData.LPDownlineInReport -->
    <!-- ГРУППОВОЙ ОБЪЁМ -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseButton1 from '@/components/base/BaseButton1.vue'
import BaseButton2 from '@/components/base/BaseButton2.vue'
import MessageBar from '@/components/MessageBar.vue'
import DepartmentIconTitle from '@/components/DepartmentIconTitle.vue'
export default {
  name: 'DistributorDashboard',
  components: {
    BaseButton1,
    BaseButton2,
    MessageBar,
    DepartmentIconTitle
  },
  data() {
    return {
      notifyPaidVersion: false,
      showMessage: false,
      messageText: ''
    }
  },
  computed: {
    ...mapState('user', ['userData', 'distributorData']),
    ...mapGetters('user', ['isPaidVersion']),
    referralLink: function () {
      return `${process.env.VUE_APP_HOST_NAME}${process.env.BASE_URL}?r=${this.userData.id4Life}`
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
    }
  },
  methods: {
    goToPayment() {
      this.notifyPaidVersion = false
      this.$router.push({ name: 'cabinet', params: { openPaymentTab: true } })
    },
    copyRefLinkToClipboard() {
      this.showShareResult = false
      navigator.clipboard
        .writeText(this.referralLink)
        .then(() => {
          this.messageText = 'Ссылка скопирована в буфер'
          this.showMessage = true
        })
        .catch((err) => {
          this.messageText = 'Произошла ошибка: ' + (err.response || '')
          this.showMessage = true
        })
    },
    shareLink() {
      if (navigator.share) {
        navigator.share({
          title: 'TF',
          text: 'Присоединяйтесь к TF:',
          url: this.referralLink
        })
        // .then(() => console.log('Successful share'))
        // .catch((error) => console.log('Error sharing', error))
      } else {
        this.messageText = 'Функция недоступна на вашем устройстве'
        this.showMessage = true
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  width: 230px;
  min-height: var(--content-height);
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dashboard__main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dashboard__referal-link {
  height: 356px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--white-1);
  width: 100%;
  border-radius: 8px;
  margin: 20px 0;
  padding: 18px 0 36px;
}
.dashboard__referal-link-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.dashboard__referal-link-url {
  color: var(--gray-1);
}
.dashboard__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 150px;
}
</style>
