<template>
  <IconBase
    :width="width"
    :height="height"
    view-box="0 0 24 24"
    icon-name="bell"
  >
    <path
      d="M11 24a3 3 0 0 0 3-3H8a3 3 0 0 0 3 3Zm0-21.122-1.196.242A6.003 6.003 0 0 0 5 9c0 .943-.201 3.296-.689 5.614-.24 1.15-.564 2.348-.994 3.386h15.365c-.43-1.038-.753-2.235-.994-3.386-.488-2.318-.689-4.671-.689-5.613a6.002 6.002 0 0 0-4.804-5.88l-1.196-.244v.001ZM20.328 18c.334.67.721 1.202 1.17 1.5H.5c.448-.298.835-.83 1.17-1.5 1.35-2.7 1.83-7.68 1.83-9 0-3.629 2.58-6.659 6.007-7.35a1.5 1.5 0 1 1 2.985 0A7.503 7.503 0 0 1 18.499 9c0 1.32.48 6.3 1.83 9Z"
    />
  </IconBase>
</template>
<script>
import IconBase from '@/components/base/IconBase.vue'
export default {
  name: 'IconBell',
  components: {
    IconBase
  },
  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
