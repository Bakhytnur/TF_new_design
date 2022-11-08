<template>
  <div class="app-footer">
    <div class="app-container">
      <ul class="font-10-regular">
        <li
          v-for="item in menuItems"
          :key="item.name"
          class="app-footer__item"
          :class="{ 'app-footer__item_active': activeBtn === item.name }"
          @click="handleClick(item.name)"
        >
          <div class="app-footer__item-container">
            <component :is="item.iconComponent" />
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconHome from '@/components/icons/IconHome.vue'
import IconCatalog from '@/components/icons/IconCatalog.vue'
import IconBaza from '@/components/icons/IconBaza.vue'
import IconNews from '@/components/icons/IconNews.vue'
import IconCabinet from '@/components/icons/IconCabinet.vue'
export default {
  name: 'AppFooter',
  components: {
    IconHome,
    IconCatalog,
    IconBaza,
    IconNews,
    IconCabinet
  },
  data() {
    return {
      menuItems: [
        { name: 'home', title: 'Мой TF', iconComponent: 'IconHome' },
        { name: 'catalog', title: 'Каталог', iconComponent: 'IconCatalog' },
        {
          name: 'knowledgeBase',
          title: 'База знаний',
          iconComponent: 'IconBaza'
        },
        { name: 'news', title: 'Новости', iconComponent: 'IconNews' },
        { name: 'cabinet', title: 'Кабинет', iconComponent: 'IconCabinet' }
      ]
    }
  },
  computed: {
    activeBtn() {
      return this.$route.meta.bottomMenuItem
    }
  },
  methods: {
    handleClick(itemName) {
      this.$route.name === itemName || this.$router.push({ name: itemName })
    }
  }
}
</script>

<style scoped>
.app-footer {
  position: fixed;
  z-index: 200;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: var(--white-1);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.15);
}
.app-footer ul {
  height: 48px;
  display: flex;
}
.app-footer__item {
  list-style: none;
  flex-grow: 1;
  border-top: var(--white-1) 4px solid;
  border-bottom: var(--white-1) 4px solid;
  color: var(--gray-1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-footer__item_active {
  color: var(--blue-1);
  border-bottom: var(--blue-1) 4px solid;
}
.app-footer__item-container {
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
