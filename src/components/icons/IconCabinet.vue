<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 13 13"
    icon-name="cabinet"
  >
    <path
      d="M6.522 6c.798 0 1.563-.316 2.128-.879a2.996 2.996 0 0 0 0-4.242 3.013 3.013 0 0 0-4.255 0 2.996 2.996 0 0 0 0 4.242C4.96 5.684 5.725 6 6.522 6Zm2.006-3c0 .53-.211 1.04-.588 1.414A2.008 2.008 0 0 1 4.517 3c0-.53.211-1.04.587-1.414A2.008 2.008 0 0 1 8.528 3Zm4.011 8c0 1-1.003 1-1.003 1H1.508S.506 12 .506 11s1.002-4 6.016-4 6.017 3 6.017 4Zm-1.003-.004c0-.246-.154-.986-.834-1.664C10.048 8.68 8.818 8 6.522 8s-3.525.68-4.18 1.332c-.68.678-.832 1.418-.834 1.664h10.028Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconCabinet',
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
