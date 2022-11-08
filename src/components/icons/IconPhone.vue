<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 17 17"
    icon-name="phone"
  >
    <path
      d="M4.154 1.328a.678.678 0 0 0-1.015-.063L2.105 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.57 17.57 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.982 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L4.154 1.328ZM2.384.511a1.745 1.745 0 0 1 2.612.163L6.79 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.635 18.635 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L2.385.511h-.001Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconPhone',
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
