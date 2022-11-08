<template>
  <div>
    <section
      v-if="
        title == 'Заказы' ||
        title == 'Просмотренные статьи' ||
        title == 'Просмотренные продукты'
      "
      class="top-navigation"
    >
      <div class="top-navigation__link">
        <IconStepBack
          v-if="useNavigation"
          class="top-navigation__arrow"
          @click.native="$router.push(`/partner-card/${partnerId}`)"
        />
        <span class="font-24-medium">
          {{ title }}
        </span>
      </div>
      <IconQuestionCircle class="top-navigation__question" />
    </section>
    <section v-else class="top-navigation">
      <div class="top-navigation__link">
        <IconStepBack
          v-if="useNavigation"
          class="top-navigation__arrow"
          @click.native="handleArrowClick"
        />
        <span class="font-24-medium">
          {{ title }}
        </span>
      </div>
      <IconQuestionCircle class="top-navigation__question" />
    </section>
    <section v-if="title == 'Контроль структуры'" class="group-volume">
      <div class="group-volume__indicator">
        <div class="group-volume__text">
          <span class="group-volume__main-text font-16-regular-caps">
            ГРУППОВОЙ ОБЪЁМ
          </span>
          <span class="group-volume__bottom-text font-12-regular"
            >Посмотрите объем покупок вашей структуры</span
          >
        </div>
        <span class="font-16-bold">305/222</span>
      </div>
    </section>
    <section v-if="title == 'Профиль'" class="partner-card">
      <div class="partner-card__main-data">
        <div class="partner-card__text">
          <section class="partner__open">
            <!--div class="partner__open-photo-title"-->
            <div v-if="userDataImage != ''" class="partner__open-icon">
              <!--img src="/../../foto.png" /-->
              <img :src="userDataImage" />
            </div>
            <div v-else class="partner__open-icon">
              <!--img src="/../../foto.png" /-->
              <img src="/../../foto.png" />
            </div>

            <div>
              <p class="partner__open-title font-16-bold">
                {{ userDataName }}
              </p>
              <p class="partner__open-subtitle font-12-regular-10">
                ID: {{ userDataId }}
              </p>
              <p class="partner__open-subtitle font-12-regular">
                Location: {{ userDataDepartmentName }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IconQuestionCircle from '@/components/icons/IconQuestionCircle.vue'
import IconStepBack from '@/components/icons/IconStepBack.vue'
export default {
  name: 'TopNavigation',
  components: {
    IconQuestionCircle,
    IconStepBack
  },
  props: {
    showLogout: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    route: {
      type: String,
      default: ''
    },
    routeProps: {
      type: Object,
      default: function () {
        return {}
      }
    },
    useNavigation: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userDataName: {
      type: String,
      default: ''
    },
    userDataId: {
      type: String,
      default: ''
    },
    userDataImage: {
      type: String,
      default: ''
    },
    userDataDepartmentName: {
      type: String,
      default: ''
    },
    userData: {
      type: Object,
      required: true
    },
    partnerId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: 'Иванова Татьяна',
      partnersId: '542 589'
    }
  },
  methods: {
    handleArrowClick() {
      if (this.route && this.$route.name !== this.route) {
        this.$router.push({ name: this.route, params: this.routeProps })
      }
    }
  }
}
</script>

<style scoped>
.top-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--blue-3);
  height: var(--top-nav-height);
  color: var(--white-1);
  padding: 0 20px;
}
.top-navigation__link {
  display: flex;
  align-items: center;
}
.top-navigation__arrow {
  margin-right: 10px;
  flex-shrink: 0;
}
.top-navigation__question {
  flex-shrink: 0;
}
.group-volume {
  /*display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;*/
  /*padding: 10px 0;*/
  border: 1px solid var(--blue-1);
  border-radius: 8px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  background-color: var(--blue-1);
  color: var(--black-1);
}
.group-volume__indicator {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  padding: 10px 0;
  margin-left: 20px;
  margin-right: 20px;
  color: var(--white-1);
}
.group-volume__text {
  display: flex;
  flex-direction: column;
}
.group-volume__main-text {
  margin-bottom: 5px;
}
.group-volume__bottom-text {
  width: 70%;
}
.partner-card {
  /*display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;*/
  /*padding: 10px 0;*/
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  color: var(--black-1);
}
.partner-card__main-data {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
  padding: 10px 0;
  /*margin-left: 20px;
  margin-right: 20px;*/
  color: var(--white-1);
}
.partner-card__text {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.partner__open {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*padding: 10px 0;*/
  color: var(--black-1);
}
.partner__open-icon {
  margin-right: 25px;
  width: 84px;
  height: 84px;
}
.partner__open-title {
  width: 75px;
  color: var(--white-1);
  margin-bottom: 5px;
}
.partner__open-subtitle {
  color: var(--white-1);
  margin-bottom: 5px;
}
</style>
