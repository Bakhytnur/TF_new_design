<template>
  <IconBase :width="width" :height="height" view-box="0 0 16 16" icon-name="X">
    <g>
      <path
        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
      />
      <path
        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
      />
    </g>
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconX',
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
