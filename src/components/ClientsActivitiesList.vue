<template>
  <v-list id="activities-list" class="py-2 rounded-b-lg">
    <v-list-group
      v-for="(clientRow, idx) in dataSource"
      :key="idx"
      no-action
      class="px-1 my-2"
      style="border-bottom: 1px solid #eceff1"
    >
      <template #activator>
        <div class="d-flex text-body-2" style="width: 100%">
          <div
            class="flex-shrink-0 mb-1 mr-2"
            style="width: 50px; height: 50px"
            @click.stop="openClientProfile(clientRow.clientId)"
          >
            <img
              v-if="clientRow.clientImage"
              alt="Аватар"
              :src="'data:image/jpeg;base64,' + clientRow.clientImage"
              style="
                border-radius: 50%;
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
            />

            <!-- <v-img
              v-if="clientRow.clientImage"
              height="auto"
              max-width="50px"
              max-height="50px"
              alt="Аватар"
              :src="'data:image/jpeg;base64,' + clientRow.clientImage"
            >
            </v-img> -->
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

          <p class="my-0">
            <span
              class="font-weight-bold blue--text"
              @click.stop="openClientProfile(clientRow.clientId)"
            >
              {{ clientRow.clientName }}
            </span>
            {{ clientRow.activityName }}
            <span class="text-caption">
              {{ clientRow.date }}
            </span>
          </p>
        </div>
      </template>

      <v-list-item
        v-for="activityRow in clientRow.activities"
        :key="activityRow.id"
      >
        <ActivitiesItemArticle
          v-if="clientRow.activityType === 'Статья'"
          :item-data="activityRow"
        />
        <ActivitiesItemProduct
          v-else-if="clientRow.activityType === 'Товар'"
          :item-data="activityRow"
        />
        <p v-else>Неизвестно</p>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import ActivitiesItemArticle from '@/components/ActivitiesItemArticle.vue'
import ActivitiesItemProduct from '@/components/ActivitiesItemProduct.vue'
export default {
  name: 'ClientsActivitiesList',
  components: {
    ActivitiesItemArticle,
    ActivitiesItemProduct
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('knowledgeBase', ['allArticlesIdTitle']),
    ...mapState('catalog', ['products'])
  },
  created() {
    if (this.allArticlesIdTitle.length === 0) {
      this.$store.dispatch('knowledgeBase/fetchAllArticlesIdTitle')
    }
    if (this.products.length === 0) {
      this.$store.dispatch('catalog/fetchProducts')
    }
  },
  methods: {
    openClientProfile(clientId) {
      this.$router.push({
        name: 'downlineClientProfile',
        params: {
          id: clientId,
          backRoute: 'clientsActivities',
          backRouteProps: { dataSource: this.dataSource }
        }
      })
    }
  }
}
</script>

<style>
#activities-list .v-list-item {
  padding: 0 !important;
}
</style>
