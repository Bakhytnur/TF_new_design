<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 23 23"
    icon-name="cart"
  >
    <path
      d="M.5 1.25A.75.75 0 0 1 1.25.5H3.5a.75.75 0 0 1 .728.569L4.835 3.5H22.25a.75.75 0 0 1 .735.897l-1.5 7.5a.75.75 0 0 1-.697.601l-14.096.709.43 2.293H20a.75.75 0 1 1 0 1.5H6.5a.75.75 0 0 1-.737-.612L3.515 4.41 2.915 2H1.25a.75.75 0 0 1-.75-.75ZM5.153 5l1.26 6.719 13.716-.689L21.335 5H5.153ZM8 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10.5 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm10.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconCart',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 23
    },
    height: {
      type: [Number, String],
      default: 23
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
