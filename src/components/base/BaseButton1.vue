<template>
  <button class="base-button-1" :class="fontClass" @click="$emit('click')">
    <span class="base-button-1__title">{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton1',
  props: {
    title: {
      type: String,
      required: true
    },
    fontClass: {
      type: String,
      default: 'font-12-medium-caps'
    }
  }
}
</script>

<style scoped>
.base-button-1 {
  min-width: 150px;
  display: block;
  height: 40px;
  position: relative;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.2));
  border-radius: 8px;
  background: var(--blue-1);
  color: var(--white-1);
}
.base-button-1:active {
  background: var(--green-1);
  color: var(--black-1);
}
.base-button-1__title {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 32.5%;
  bottom: 32.5%;
}
</style>
