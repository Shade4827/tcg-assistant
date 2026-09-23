<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

type CoinSide = 'heads' | 'tails'

const isFlipping = ref(false)

const currentRotation = ref(0)
const fromRotation = ref(0)
const toRotation = ref(0)

const flipCoin = () => {
  if (isFlipping.value) return

  isFlipping.value = true

  const nextResult: CoinSide = Math.random() < 0.5 ? 'heads' : 'tails'

  // 現在位置から最低6回転させる
  const baseRotation = Math.ceil(currentRotation.value / 360) * 360 + 2160

  // 表: 0度, 裏: 180度
  const targetOffset = nextResult === 'heads' ? 0 : 180

  fromRotation.value = currentRotation.value
  toRotation.value = baseRotation + targetOffset

  currentRotation.value = toRotation.value

  setTimeout(() => {
    isFlipping.value = false
  }, 1500)
}
</script>

<template>
  <BaseModal :show="props.show" header-text="コイントス" @close="emit('close')">
    <div class="flex flex-col items-center">
      <div class="[perspective:1000px] m-8" @click="flipCoin">
        <div
          class="relative size-32 [transform-style:preserve-3d]"
          :class="{ 'animate-coin-flip': isFlipping }"
          :style="{
            '--from-rotation': `${fromRotation}deg`,
            '--to-rotation': `${toRotation}deg`,
            transform: isFlipping ? undefined : `rotateX(${currentRotation}deg)`,
          }"
        >
          <div
            class="absolute inset-0 flex items-center justify-center rounded-full border-4 border-yellow-600 bg-yellow-400 text-4xl font-bold text-yellow-900 shadow-lg [backface-visibility:hidden]"
          >
            オモテ
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center rounded-full border-4 border-cyan-600 bg-cyan-500 text-4xl font-bold text-white shadow-lg [backface-visibility:hidden] [transform:rotateX(180deg)]"
          >
            ウラ
          </div>
        </div>
      </div>

      <button
        class="rounded border px-4 py-2 disabled:opacity-50 bg-blue-500 text-white"
        :disabled="isFlipping"
        @click="flipCoin"
      >
        コイントス
      </button>
    </div>
  </BaseModal>
</template>

<style scoped>
@keyframes coin-flip {
  0% {
    transform: rotateX(var(--from-rotation));
  }

  15% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.35)
    );
  }

  30% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.6)
    );
  }

  45% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.78)
    );
  }

  60% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.9)
    );
  }

  75% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.96)
    );
  }

  90% {
    transform: rotateX(
      calc(var(--from-rotation) + (var(--to-rotation) - var(--from-rotation)) * 0.99)
    );
  }

  100% {
    transform: rotateX(var(--to-rotation));
  }
}

.animate-coin-flip {
  animation: coin-flip 1.5s ease-out forwards;
}
</style>
