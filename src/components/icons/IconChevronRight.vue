<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 14 14"
    icon-name="chevron right"
  >
    <path
      d="M.646.152a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 1 1-.708-.708l5.647-5.646L.646.86a.5.5 0 0 1 0-.708Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconChevronRight',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 14
    },
    height: {
      type: [Number, String],
      default: 14
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
