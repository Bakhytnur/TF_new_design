<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 17 17"
    icon-name="email"
  >
    <path
      d="M0 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-8Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4.5a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.605V5.883Zm-.034 6.876-5.64-3.471L8 10.083l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13.5h12a1 1 0 0 0 .966-.741ZM1 11.605l4.708-2.897L1 5.883v5.722Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconEmail',
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
