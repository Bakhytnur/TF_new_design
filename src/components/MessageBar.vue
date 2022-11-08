<template>
  <transition name="fade" mode="out-in">
    <div v-if="showContent" class="message-bar">
      <div class="message-bar__container">
        <span class="font-16-regular-caps message-bar__message">
          {{ message }}
        </span>
        <BaseButton1
          v-if="showButton"
          class="message-bar__button"
          :title="buttonTitle"
          @click="$emit('button-click')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton1 from '@/components/base/BaseButton1.vue'
export default {
  name: 'MessageBar',
  components: {
    BaseButton1
  },
  props: {
    message: {
      type: String,
      required: true
    },
    showButton: {
      type: Boolean,
      default: false
    },
    buttonTitle: {
      type: String,
      default: 'Ok'
    }
  },
  data() {
    return {
      showContent: false
    }
  },
  mounted() {
    this.showContent = true
  }
}
</script>

<style scoped>
.message-bar {
  position: fixed;
  top: calc(50% - 80px);
  left: 0;
  width: 100%;
}
.message-bar__container {
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  background: var(--white-1);
}
.message-bar__message {
  text-align: center;
}
.message-bar__button {
  text-align: center;
  margin-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
