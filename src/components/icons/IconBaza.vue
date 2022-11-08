<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 16 16"
    icon-name="baza"
  >
    <g>
      <path
        d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3Zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1Zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5Z"
      />
      <path
        d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13Zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13Z"
      />
    </g>
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconBaza',
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
