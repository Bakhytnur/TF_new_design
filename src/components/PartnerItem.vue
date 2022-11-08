<template>
  <div>
    <section
      v-if="!showCard"
      class="partner"
      :class="showBorder ? 'partner__border' : 'partner__padding'"
    >
      <div>
        <!--p class="font-14-regular" :class="!showBorder ? 'partner__title' : ''">
          {{ title }}
        </p-->
        <p class="font-14-regular" :class="!showBorder ? 'partner__title' : ''">
          {{ name }}
        </p>
        <!--p v-if="subtitle" class="partner__subtitle font-12-regular-10">
          {{ subtitle }}
        </p-->
        <p v-if="subtitle" class="partner__subtitle font-12-regular-10">
          {{ id }}
        </p>
      </div>
      <div class="partner__value font-14-bold">
        <!--span> {{ value }} </span-->
        <span> {{ lp }} </span>
        <img
          src="/../../nav-arrow-down-svgrepo-com.svg"
          width="35"
          height="25"
          class="partner__value-icon"
          @click="openCard"
        />
      </div>
    </section>

    <section
      v-else-if="hideFirst"
      class="partner__hided"
      :class="showBorder ? 'partner__hided-border' : ''"
    >
      <img
        v-if="hideFirst"
        src="/../../arrow-left-svgrepo-com.svg"
        width="35"
        height="25"
        class="partner__value-icon-left"
        @click="hideFirstFunc2"
      />
      <!--p
        v-if="hideFirst"
        class="partner__title2 font-13-regular"
        :class="hideFirst && !showBorder ? 'partner__hided-right-shift' : ''"
      >
        {{ title }}
      </p-->
      <p
        v-if="hideFirst"
        class="partner__title2 font-13-regular"
        :class="hideFirst && !showBorder ? 'partner__hided-right-shift' : ''"
      >
        {{ name }}
      </p>

      <!--p v-if="hideFirst" class="partner__subtitle2 font-12-regular-10">
        {{ subtitle }}
      </p-->
      <p v-if="hideFirst" class="partner__subtitle2 font-12-regular-10">
        {{ id }}
      </p>

      <div class="partner__subcard"  >
        <ul class="partner__subcard-list__data-ul">
          <div class="line"></div>
          <li
            v-for="partner in subpartners"
            :key="partner.id"
            class="partner__subcard-list__data-ul-li" 
            
          >
            <!--PartnerItem
              class="partner2"
              :title="partner.title"
              :subtitle="partner.subtitle"
              :value="partner.value"
              :level="partner.level"
              :id="partner.id"
              :subpartners="partner.subpartners"
              :showBorder="false"
              :hideFirst="false"
              :j="j + 1"
              @click="hideFirstFunc2"
            /-->

            <PartnerItem
              class="partner2"
              :id="partner.id"
              :level="partner.level"
              :lp="lp"
              :lpInReport="partner.lpInReport"
              :name="partner.name"
              :parent="partner.parent"
              :subpartners="partner.children"
              :showBorder="false"
              :hideFirst="false"
              :j="j + 1"
              @click="hideFirstFunc2"
            />
          </li>
        </ul>
      </div>
    </section>

    <section
      v-else
      class="partner__open"
      :class="showBorder ? 'partner__open-border' : ''"
      @click="hideFirstFunc"
    >
      <div class="partner__open-icon" v-if="!hideFirst">
        <!--img src="/../../favicon.ico" /-->
        <div v-if="userData.image != ''" class="partner__open-icon">
          <img :src="userData.image" />
        </div>
        <div v-else class="partner__open-icon">
          <img src="/../../foto.png" />
        </div>
      </div>

      <div v-if="!hideFirst" @click="openPartnerCard">
        <!--p class="partner__open-title font-16-regular-400">
          {{ title }}
        </p>
        <p v-if="subtitle" class="partner__subtitle font-12-regular-10">
          {{ subtitle }}
        </p-->

        <p class="partner__open-title font-16-regular-400">
          {{ name }}
        </p>
        <p v-if="subtitle" class="partner__subtitle font-12-regular-10">
          {{ id }}
        </p>
      </div>

      <div
        v-if="!hideFirst"
        class="partner__value font-24-medium"
      >
        <span> {{ lp }} </span>
        <img
          src="/../../arrow-right-svgrepo-com.svg"
          width="35"
          height="25"
          class="partner__value-icon"
          @click="closeCard"
        />
      </div>

      <!--div
        v-if="hideFirst"
        class="partner__value font-14-bold"
        @click="hideFirstFunc2"
      -->

      <div class="partner__subcard" :class="showCard ? 'children' : '' ">
        <ul class="partner__subcard-list__data-ul">
          <li
            v-for="partner in subpartners"
            :key="partner.id"
            class="partner__subcard-list__data-ul-li"
            
          >
            <div v-if="showCard" class="line"></div>
            <!--PartnerItem
              class="partner2"
              :title="partner.title"
              :subtitle="partner.subtitle"
              :value="partner.value"
              :level="partner.level"
              :id="partner.id"
              :showBorder="false"
              :hideFirst="false"
              :j="j + 1"
              @click="hideFirstFunc2"
            /-->

            <PartnerItem
              class="partner2"
              :id="partner.id"
              :level="partner.level"
              :lp="lp"
              :lpInReport="partner.lpInReport"
              :name="partner.name"
              :parent="partner.parent"
              :subpartners="partner.children"
              :showBorder="false"
              :hideFirst="false"
              :j="j + 1"
              @click="hideFirstFunc2"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PartnerItem',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    colorVariant: {
      type: String,
      default: 'blue'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    subpartners: {
      type: Array,
      required: false
    },
    subpartners2: {
      type: Array,
      required: false
    },
    id: {
      type: String,
      required: true
    },
    items: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lp: {
      type: String,
      required: true
    },
    lpInReport: {
      type: String,
      required: true
    },
    parent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showCard: false,
      hideFirst: true,
      i: 0,
      j: 0
    }
  },
  computed: {
    ...mapState('downlineClient', ['userData', 'orders']),
    valueColorClass() {
      return 1
    },
    changeFirstWindow() {
      switch (this.hideFirst) {
        case false:
          return 1
        case true:
          return 2
        default:
          return 1
      }
    },
    changeFirst() {
      if (!this.hideFirst) {
        return this.hideFirstFunc
      } else {
        return this.hideFirstFunc2
      }
    }
  },
  created() {
    if (this.id) {
      this.isLoadingClientInfo = true
      this.isLoadingClientOrders = true
      this.$store
        .dispatch('downlineClient/getDownlineClientInfo', this.id)
        .finally(() => {
          this.isLoadingClientInfo = false
        })
      this.$store
        .dispatch('downlineClient/getDownlineClientOrders', this.id)
        .finally(() => {
          this.isLoadingClientOrders = false
        })
    } else {
      this.$router.push({ name: '404' })
    }
  },
  methods: {
    openCard() {
      this.showCard = true
      this.i = this.i + 1
      this.j = this.j + 1
      this.hideFirst = false
    },
    openCard2() {
      this.showCard = true
      this.hideFirst = true
    },
    closeCard() {
      this.showCard = false
    },
    hideFirstFunc() {
      if (this.hideFirst == false) {
        this.hideFirst = true
      }
    },
    hideFirstFunc2() {
      if (this.hideFirst == true) {
        this.hideFirst = false
      }
    },
    openPartnerCard() {
      this.$router.push(`/partner-card/${this.id}`)
      /*this.$router.push({
        name: 'PartnerCard',
        params: { id: partner.id, backRoute: 'StructureControl' }
      })*/
    }
  }
}
</script>

<style scoped>
.partner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: var(--black-1);
}
.partner__border {
  height: 72px;
  border: 1px solid var(--gray-2);
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.partner__padding {
  padding-left: 20px;
}
.partner__title {
  color: var(--blue-1);
}
.partner__subtitle {
  margin-top: 5px;
  color: var(--gray-1);
}
.partner__value {
  display: flex;
  flex-direction: column;
  color: var(--blue-1);
  margin-left: auto;
}
.partner__value-icon {
  margin-top: 5px;
  margin-left: auto;
}
.partner__value-icon-left {
}
.line {
  border-bottom: 1px solid var(--gray-1);
  margin-top: 15px;
}
.partner__open {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  align-items: center;
  padding: 10px 0;
  color: var(--black-1);
}
.partner__open-border {
  /*height: 72px;*/
  border: 1px solid var(--gray-2);
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.partner__open-photo-title {
  flex-wrap: wrap;
}
.partner__open-icon {
  padding-right: 10px;
}
.partner__open-title {
  width: 75px;
}
.partner__item {
  /*margin-top: -15px;*/
}
.partner__subcard {
  width: 100%;
  margin-left: 10px;
  /*padding-left: 20px;*/
}
.partner2 {
  color: var(--black-1);
}

.partner__close2 {
  padding-left: 20px;
}

.partner__title2 {
  color: var(--gray-1);
  margin-top: 2px;
}

.partner__subtitle2 {
  margin-top: 5px;
  padding-left: 20px;
  color: var(--gray-1);
}

.partner__hided {
  display: flex;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  align-items: center;
  padding: 10px 0;
  color: var(--black-1);
}
.partner__hided-border {
  /*height: 72px;*/
  border: 1px solid var(--gray-2);
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  margin-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.partner__subcard-list__data-ul {
  list-style-type: none;
}
.partner__subcard-list__data-ul-li {
}

.children {
  border-bottom: 2px dotted var(--gray-2);
  margin-left: 15px;
}

/*.indicator__value {
  border-radius: 50%;
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 20px;
}
.indicator__value_blue {
  background: var(--blue-3);
  color: var(--white-1);
}
.indicator__value_red {
  background: var(--red-1);
  color: var(--white-1);
}
.indicator__value_green {
  background: var(--green-1);
  color: var(--black-1);
}*/
</style>
