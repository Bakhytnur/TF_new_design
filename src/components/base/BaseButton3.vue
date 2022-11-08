<template>
  <button class="base-button-3 font-14-regular" @click="$emit('click')">
    <span>{{ title }}</span>

    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.646 14.354a.5.5 0 0 1 0-.708L10.293 8 4.646 2.354a.5.5 0 0 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BaseButton3',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.base-button-3 {
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--gray-2);
  color: var(--black-1);
}
.base-button-3:active {
  background: var(--blue-1);
  color: var(--white-1);
}
</style>
