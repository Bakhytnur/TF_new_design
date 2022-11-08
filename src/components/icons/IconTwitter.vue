<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 17 17"
    icon-name="twitter"
  >
    <path
      d="M5.026 13.5c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.684 6.684 0 0 0 16 2.042c-.6.265-1.237.44-1.889.518A3.301 3.301 0 0 0 15.558.743a6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 4.53a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 5.075v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 12.08a6.334 6.334 0 0 1-.78-.045A9.345 9.345 0 0 0 5.026 13.5Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconTwitter',
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
