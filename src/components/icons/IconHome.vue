<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 15 15"
    icon-name="home"
  >
    <path
      d="M3.5 10h-2v3h2v-3Zm5-4h-2v7h2V6Zm5-5v12h-2V1h2Zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-2Zm-6 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V6Zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconHome',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 16
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
