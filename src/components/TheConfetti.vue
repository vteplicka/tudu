<template>
  <div class="confetti-wrapper">
    <div
      v-for="(confettiStyle, index) in styles"
      :key="index"
      class="confetti"
      :style="confettiStyle"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'

const random = (max: number) => {
  return Math.random() * (max - 0) + 0
}

let styles: Ref<string[]> = ref([])

const createConfetti = () => {
  for (let i = 0; i < 100; i++) {
    styles.value.push(`
      transform: translate3d(${random(500) - 250}px,
      ${random(200) - 150}px, 0) rotate(${random(360)}deg);
      background: hsla(${random(360)},100%,50%,1);
    `)
  }
}

onMounted(() => {
  createConfetti()
})
</script>

<style lang="scss" scoped>
.confetti-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.confetti {
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  width: 3px;
  height: 8px;
  background: red;
  opacity: 0;
  animation: bang 700ms ease-out forwards;
}

@keyframes bang {
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
}
</style>
