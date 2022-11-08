<template>
  <v-container
    fill-height
    class="py-0 align-start"
    style="background-color: #eaf1ff"
  >
    <v-row>
      <TopNavigation name="Активность покупателей" route="home" />
      <ProgressCircular v-if="isLoading" />
      <section v-else class="px-2" style="width: 100%">
        <section class="py-2 mx-auto" style="max-width: 40rem">
          <v-tabs
            id="clients_tabs"
            v-model="tab"
            class="px-0"
            grow
            style="border-bottom: 2px solid #fff"
          >
            <v-tab class="px-0 font-weight-bold">Активные</v-tab>
            <v-tab class="px-0 font-weight-bold">Все покупатели</v-tab>
          </v-tabs>
          <v-tabs-items
            id="clients_tabs_items"
            v-model="tab"
            class="mt-4"
            style="width: 100%"
          >
            <v-tab-item>
              <section v-if="activities.new.length > 0" class="mb-5">
                <p
                  class="py-2 my-0 text-center text-button font-weight-bold"
                  style="background-color: #eceff1"
                >
                  Новые активности
                </p>
                <ClientsActivitiesList :data-source="activities.new" />
              </section>
              <section v-if="activities.old.length > 0">
                <p
                  class="py-2 my-0 text-center rounded-t-lg text-button font-weight-bold"
                  style="background-color: #eceff1"
                >
                  Все активности
                </p>
                <ClientsActivitiesList :data-source="activities.old" />
              </section>
            </v-tab-item>
            <v-tab-item>
              <v-select
                v-model="currentSort"
                :items="sortList"
                label="Сортировать"
                item-text="text"
                item-value="value"
              ></v-select>

              <v-list id="clients-list" class="px-2 py-1 mb-4 rounded-lg">
                <v-list-item
                  v-for="client in allClientsSorted"
                  :key="client.id"
                >
                  <ClientItem :item-data="client" />
                </v-list-item>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </section>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from '@/components/TopNavigation.vue'
import ClientItem from '@/components/ClientItem.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import ClientsActivitiesList from '@/components/ClientsActivitiesList.vue'
export default {
  components: {
    TopNavigation,
    ProgressCircular,
    ClientsActivitiesList,
    ClientItem
  },
  props: {
    openTab: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isLoading: false,
      tab: 0,
      currentSort: 0,
      sortList: [
        { value: 0, text: 'по алфавиту' },
        { value: 1, text: 'по последней активности' },
        { value: 2, text: 'по наличию скидки' },
        { value: 3, text: 'по дате регистрации' }
      ]
    }
  },
  computed: {
    ...mapState('downlineClient', ['activities']),
    ...mapState('user', ['distributorData']),
    allClientsSorted() {
      const result = [...this.distributorData.allClients]
      result.sort((a, b) => {
        const firstLogin1 = a.firstLogin.split('.').map((el) => +el)
        const firstLogin2 = b.firstLogin.split('.').map((el) => +el)
        const lastLogin1 = a.lastLogin.split('.').map((el) => +el)
        const lastLogin2 = b.lastLogin.split('.').map((el) => +el)
        const dateFL1 =
          firstLogin1.length === 3
            ? Date.parse(
                `${firstLogin1[2]}-${firstLogin1[1]}-${firstLogin1[0]}`
              )
            : 0
        const dateFL2 =
          firstLogin2.length === 3
            ? Date.parse(
                `${firstLogin2[2]}-${firstLogin2[1]}-${firstLogin2[0]}`
              )
            : 0
        const dateLL1 =
          lastLogin1.length === 3
            ? Date.parse(`${lastLogin1[2]}-${lastLogin1[1]}-${lastLogin1[0]}`)
            : 0
        const dateLL2 =
          lastLogin2.length === 3
            ? Date.parse(`${lastLogin2[2]}-${lastLogin2[1]}-${lastLogin2[0]}`)
            : 0

        switch (this.currentSort) {
          case 0:
            return a.name > b.name ? 1 : -1
          case 1:
            return dateLL2 > dateLL1 ? 1 : -1
          case 2:
            return b.isDistributorPrice > a.isDistributorPrice ? 1 : -1
          case 3:
            return dateFL2 > dateFL1 ? 1 : -1
        }
      })
      return result
    }
  },
  created() {
    if (this.activities.old.length === 0 && this.activities.new.length === 0) {
      this.isLoading = true
      this.$store
        .dispatch('downlineClient/getActivities')
        .then(() => {
          this.$store.dispatch('downlineClient/setActivitiesAcquaintance')
        })
        .finally(() => {
          this.isLoading = false
        })
    } else {
      this.$store.dispatch('downlineClient/setActivitiesAcquaintance')
    }
    this.tab = this.openTab
  },
  mounted() {
    const types = [
      'ПрочтениеСтатьиБЗ',
      'ПрочтениеКарточкиТовара',
      'ПрочтениеНовостей'
    ]
    this.$store.dispatch('user/setNotificationsAcquaintance', { types })
  }
}
</script>

<style>
#clients_tabs .v-slide-group__prev {
  display: none !important;
}
#clients_tabs .v-tabs-bar,
#clients_tabs_items {
  background-color: #eaf1ff;
}

#clients-list .v-list-item {
  padding: 0 !important;
}
</style>
