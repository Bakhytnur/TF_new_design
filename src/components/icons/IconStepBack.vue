<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 24 24"
    icon-name="step-back"
  >
    <path
      d="M17.031 2.469a.75.75 0 0 1 0 1.062L8.561 12l8.47 8.469a.75.75 0 0 1-1.062 1.062l-9-9a.75.75 0 0 1 0-1.062l9-9a.75.75 0 0 1 1.062 0Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconStepBack',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
