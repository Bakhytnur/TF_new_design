<template>
  <div class="content-frame">
    <TopNavigation title="Личный кабинет" :use-navigation="false" />
    <section class="cabinet">
      <section class="cabinet-tabs">
        <ul class="cabinet-tabs__list">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            class="cabinet-tabs__item font-14-regular"
            :class="tab.id === activeTabId ? 'cabinet-tabs__item_active' : ''"
            @click="changeTab(tab.id)"
          >
            <span>{{ tab.name }}</span>
          </li>
        </ul>
        <div class="cabinet-tabs__decor-container">
          <div class="cabinet-tabs__decor"></div>
        </div>
      </section>
      <section class="cabinet__tab-content">
        <!-- <keep-alive> -->
        <component :is="activeTab.component"></component>
        <!-- </keep-alive> -->
      </section>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import CabinetProfileTab from '@/components/CabinetProfileTab.vue'
import CabinetPaymentTab from '@/components/CabinetPaymentTab.vue'
import CabinetFAQTab from '@/components/CabinetFAQTab.vue'
import CabinetOfferTab from '@/components/CabinetOfferTab.vue'
export default {
  components: {
    TopNavigation,
    CabinetProfileTab,
    CabinetPaymentTab,
    CabinetFAQTab,
    CabinetOfferTab
  },
  props: {
    openTab: {
      type: String,
      default: 'profile'
    }
  },
  data() {
    return {
      tabs: [
        { id: 'profile', name: 'Профиль', component: 'CabinetProfileTab' },
        { id: 'payment', name: 'Оплата', component: 'CabinetPaymentTab' },
        { id: 'faq', name: 'FAQ', component: 'CabinetFAQTab' },
        { id: 'offer', name: 'Оферта', component: 'CabinetOfferTab' }
      ],
      activeTabId: 'profile'
    }
  },
  computed: {
    ...mapState(['offer']),
    ...mapGetters('user', ['isDistributor']),
    activeTab() {
      return this.tabs.find((el) => el.id === this.activeTabId)
    }
  },
  created() {
    switch (this.openTab) {
      case 'profile':
        this.activeTabId = 'profile'
        break
      case 'payment':
        this.activeTabId = 'payment'
        break
      case 'faq':
        this.activeTabId = 'faq'
        break
      case 'offer':
        this.activeTabId = 'offer'
        break
      default:
        this.activeTabId = 'profile'
    }
  },
  methods: {
    changeTab(tabId) {
      if (this.activeTabId !== tabId) {
        this.activeTabId = tabId
      }
    }
  }
}
</script>

<style scoped>
.cabinet {
  background: var(--white-1);
  box-shadow: 0px -2px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  min-height: calc(var(--content-height) - var(--top-nav-height));
}
.cabinet-tabs__list {
  position: relative;
  height: 35px;
  list-style: none;
}
.cabinet-tabs__item {
  height: 60px;
  padding-top: 10px;
  position: absolute;
  top: 0;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 20px 20px 0px 0px;
  background: var(--white-1);
}
.cabinet-tabs__item:nth-child(1) {
  left: 0;
  z-index: 5;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 50%, -50% 100%);
}
.cabinet-tabs__item:nth-child(2) {
  left: 23.5%;
  z-index: 4;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 63%, -50% 63%);
}
.cabinet-tabs__item:nth-child(3) {
  left: 46.5%;
  z-index: 3;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 63%, -50% 63%);
}
.cabinet-tabs__item:nth-child(4) {
  right: 0;
  z-index: 2;
  clip-path: polygon(-50% -50%, 150% -50%, 150% 100%, -50% 50%);
}
.cabinet-tabs__item_active {
  color: var(--blue-1);
  top: -2px;
  z-index: 8 !important;
}
.cabinet-tabs__decor-container {
  position: relative;
}
.cabinet-tabs__decor {
  position: absolute;
  width: 100%;
  height: 20px;
  background: var(--white-1);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 20px 20px 0px 0px;
  z-index: 7;
  clip-path: polygon(0% -50%, 100% -50%, 100% 100%, 0% 100%);
}
.cabinet__tab-content {
  background: var(--white-1);
  padding-top: 20px;
}
</style>
