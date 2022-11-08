<template>
  <section class="indicator" :class="showBorder ? 'indicator_border' : ''">
    <div>
      <p class="font-14-regular-caps">{{ title }}</p>
      <p v-if="subtitle" class="indicator__subtitle font-12-regular">
        {{ subtitle }}
      </p>
    </div>
    <div class="indicator__value font-24-medium" :class="valueColorClass">
      <span> {{ value }} </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndicatorItem',
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
    colorVariant: {
      type: String,
      default: 'blue'
    },
    showBorder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    valueColorClass() {
      switch (this.colorVariant) {
        case 'red':
          return 'indicator__value_red'
        case 'blue':
          return 'indicator__value_blue'
        case 'green':
          return 'indicator__value_green'
        default:
          return 'indicator__value_blue'
      }
    }
  }
}
</script>

<style scoped>
.indicator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: var(--black-1);
}
.indicator_border {
  border-bottom: 1px solid var(--gray-2);
}
.indicator__subtitle {
  margin-top: 5px;
  color: var(--gray-1);
}
.indicator__value {
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
}
</style>
