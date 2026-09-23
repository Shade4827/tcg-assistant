<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/modals/BaseModal.vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

type Dice = {
  id: number
  value: number
  isRolling: boolean
}

const dices = ref<Dice[]>([
  {
    id: 1,
    value: 1,
    isRolling: false,
  },
])

const DICE_SIDES = [4, 6, 8, 10, 12, 20] as const
type DiceSides = (typeof DICE_SIDES)[number]

const sides = ref<DiceSides>(6)

const changeSides = (num: DiceSides) => {
  sides.value = num
}

const DICE_MIN_NUM = 1 as const
const DICE_MAX_NUM = 12 as const

const addDice = () => {
  if (dices.value.length >= DICE_MAX_NUM) return

  dices.value.push({
    id: Date.now(),
    value: 1,
    isRolling: false,
  })
}

const removeDice = (id: number) => {
  if (dices.value.length <= DICE_MIN_NUM) return
  dices.value = dices.value.filter((dice) => dice.id !== id)
}

const rollDice = (dice: Dice) => {
  dice.isRolling = true

  const timer = setInterval(() => {
    dice.value = Math.floor(Math.random() * sides.value) + 1
  }, 100)

  setTimeout(() => {
    clearInterval(timer)

    dice.value = Math.floor(Math.random() * sides.value) + 1
    dice.isRolling = false
  }, 1000)
}

const rollAll = () => {
  dices.value.forEach((dice) => {
    rollDice(dice)
  })
}
</script>

<template>
  <BaseModal :show="props.show" header-text="ダイス" @close="emit('close')">
    <div class="flex flex-col items-center h-[452px]">
      <div class="flex flex-1 items-center justify-center">
        <div
          class="grid gap-2 mb-4"
          :class="{
            'grid-cols-1': dices.length === 1,
            'grid-cols-2': dices.length === 2,
            'grid-cols-3': dices.length >= 3,
          }"
        >
          <div
            v-for="dice in dices"
            :key="dice.id"
            class="flex size-20 items-center justify-center rounded-xl border-2 text-3xl font-bold cursor-pointer"
            :class="{ 'dice-rolling': dice.isRolling }"
            @click="removeDice(dice.id)"
          >
            {{ dice.value }}
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-auto mb-2">
        <button
          v-for="diceSides in DICE_SIDES"
          :key="diceSides"
          class="border rounded p-1 min-w-10 cursor-pointer transition duration-300"
          :class="
            sides === diceSides ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'hover:bg-slate-200 '
          "
          @click="changeSides(diceSides)"
        >
          d{{ diceSides }}
        </button>
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="border rounded p-2 cursor-pointer hover:bg-slate-200 transition duration-300"
          @click="addDice"
        >
          + 追加
        </button>

        <button
          type="button"
          class="border rounded bg-blue-600 text-white p-2 cursor-pointer hover:bg-blue-700 transition duration-300"
          @click="rollAll"
        >
          振る
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
@keyframes dice-roll {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }

  20% {
    transform: translateY(-12px) rotate(72deg) scale(1.1);
  }

  40% {
    transform: translateY(4px) rotate(144deg) scale(0.9);
  }

  60% {
    transform: translateY(-10px) rotate(216deg) scale(1.1);
  }

  80% {
    transform: translateY(2px) rotate(288deg) scale(0.95);
  }

  100% {
    transform: translateY(0) rotate(360deg) scale(1);
  }
}

.dice-rolling {
  animation: dice-roll 0.2s linear infinite;
}
</style>
