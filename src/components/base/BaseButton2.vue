<template>
  <button class="base-button-2 font-16-regular" @click="$emit('click')">
    <div>
      <slot />
    </div>
    <IconChevronRight />
  </button>
</template>

<script>
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
export default {
  name: 'BaseButton2',
  components: {
    IconChevronRight
  }
}
</script>

<style scoped>
.base-button-2 {
  min-width: 230px;
  display: block;
  min-height: 40px;
  padding: 5px 10px 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background: var(--white-1);
  color: var(--black-1);
}
.base-button-2:active {
  background: var(--gray-1);
  color: var(--black-1);
}
</style>
