<template>
  <v-row
    no-gutters
    style="border-top: 1px #eceff1 solid"
    class="py-2 px-2 align-center"
    :class="{ notActive: isLoading }"
    @click="openArticle"
  >
    <v-col cols="3" class="pa-0">
      <img
        alt="Картинка товара"
        :src="item.image"
        style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          vertical-align: middle;
        "
      />
    </v-col>
    <v-col cols="9" class="pa-0 pl-4">
      <p class="my-0 text-caption text--secondary">
        {{ item.formatted_date }}
      </p>
      <p class="my-0 text-body-2">
        {{ item.title }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isLoading: Boolean
  },
  methods: {
    openArticle() {
      this.$router.push({
        name: 'article',
        params: { id: parseInt(this.item.id) }
      })
    }
  }
}
</script>

<style scoped>
.notActive {
  opacity: 0.5;
}
</style>
