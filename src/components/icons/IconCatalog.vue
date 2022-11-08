<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 17 17"
    icon-name="catalog"
  >
    <g>
      <path
        d="M15.25 1a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13Zm-13-1a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5h-13Z"
      />
      <path
        d="M5.75 6a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </g>
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconCatalog',
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
