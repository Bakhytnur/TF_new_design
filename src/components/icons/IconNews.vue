<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 17 17"
    icon-name="news"
  >
    <path
      d="M2.75 3.5a.5.5 0 1 1 0-1h11a.5.5 0 0 1 0 1h-11Zm2-2a.5.5 0 1 1 0-1h7a.5.5 0 0 1 0 1h-7ZM.25 13a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 .25 6v7Zm1.5.5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconNews',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 17
    },
    height: {
      type: [Number, String],
      default: 17
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
