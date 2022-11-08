<template>
  <div class="client-card">
    <section
      v-if="shortVariant"
      class="client-short"
      @click="shortVariant = false"
    >
      <div class="font-14-regular">
        <span>{{ client.fio }}</span>
        <span v-if="client.id4Life" class="client-short__id4life">
          {{ `(${client.id4Life})` }}
        </span>
      </div>
      <IconChevronRight
        class="control-icon"
        :class="{ 'control-icon_open': !shortVariant }"
      />
    </section>

    <section v-else class="client-full">
      <div class="client-full__top">
        <section class="client-avatar">
          <img
            v-if="client.image"
            class="client-avatar__image"
            alt="Аватар"
            :src="'data:image/jpeg;base64,' + client.image"
          />

          <IconCabinet
            v-else
            class="client-avatar__placeholder"
            width="64"
            height="64"
          />
        </section>
        <section class="client-info">
          <p class="client-info__name font-16-regular">
            {{ client.fio }}
          </p>
          <p class="client-info__id font-14-regular-caps">
            {{ client.id4Life }}
          </p>
        </section>
        <IconChevronRight
          class="control-icon control-icon_open"
          @click.native="shortVariant = true"
        />
      </div>

      <div class="border"></div>

      <section class="client-contacts">
        <div class="client-contacts__item">
          <IconPhone class="client-contacts__item-icon" />
          <span class="client-contacts__item-content font-16-regular">
            {{ client.phoneNumber }}
          </span>
        </div>

        <div class="client-contacts__item">
          <IconEmail class="client-contacts__item-icon" />
          <span class="client-contacts__item-content font-16-regular">
            {{ client.email }}
          </span>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconCabinet from '@/components/icons/IconCabinet.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconEmail from '@/components/icons/IconEmail.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
export default {
  name: 'ClientCard',
  components: {
    IconCabinet,
    IconPhone,
    IconEmail,
    IconChevronRight
  },
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shortVariant: true
    }
  },
  computed: {
    ...mapState('user', ['userData'])
  }
}
</script>

<style scoped>
.client-card {
  padding: 0 15px 0px 20px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--white-1);
  color: var(--black-1);
}
.client-short {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.client-short__id4life {
  color: var(--gray-1);
  padding-left: 5px;
}
.client-full {
  height: 188px;
  padding: 16px 0;
}
.client-full__top {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.client-avatar {
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.client-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.client-avatar__placeholder {
  color: var(--gray-1);
}
.client-info {
  margin: 0 30px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.client-info__name {
  color: var(--black-1);
}
.client-info__id {
  color: var(--gray-1);
}

.control-icon {
  color: var(--gray-1);
  transform: rotate(90deg);
}
.control-icon_open {
  transform: rotate(-90deg);
}
.border {
  border: 1px solid var(--gray-1);
  margin: 16px 0 0;
}
.client-contacts__item {
  margin-top: 16px;
}
.client-contacts__item-icon {
  color: var(--blue-3);
}
.client-contacts__item-content {
  color: var(--black-1);
  margin-left: 3px;
}
</style>
