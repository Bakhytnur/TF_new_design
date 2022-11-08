<template>
  <div class="progress-circular" :class="colorClass"></div>
</template>

<script>
export default {
  name: 'ProgressCircular',
  props: {
    color: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    colorClass() {
      switch (this.color) {
        case 'white':
          return 'progress-circular_white'
        case 'blue':
          return 'progress-circular_blue'
        default:
          return 'progress-circular_white'
      }
    }
  }
}
</script>

<style scoped>
.progress-circular {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: rotation 1s infinite linear;
  transform: translateZ(0);
}
.progress-circular_white {
  border: 4px solid var(--white-1);
  border-left: 4px solid transparent;
}
.progress-circular_blue {
  border: 4px solid var(--blue-3);
  border-left: 4px solid transparent;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
