<script setup lang="ts">
import { computed, ref } from 'vue'
import ModalButton from '@/components/ModalButton.vue'
import LuhrgoyfModal from '@/components/modals/LuhrgoyfModal.vue'
import ManaModal from '@/components/modals/ManaModal.vue'
import EmblemModal from '@/components/modals/EmblemModal.vue'
import NumberControl from '@/components/NumberControl.vue'
import DiceModal from '@/components/modals/DiceModal.vue'
import type { ModalId, ManaCount, Emblem } from '@/types/type'

const activeModal = ref<ModalId | null>(null)

const handleClick = (id: ModalId) => {
  activeModal.value = id
}

const closeModal = () => {
  activeModal.value = null
}

const LURGOYD_CHECKBOXES = [
  { id: 'checkbox-creature', label: 'クリーチャー' },
  { id: 'checkbox-land', label: '土地' },
  { id: 'checkbox-artifact', label: 'アーティファクト' },
  { id: 'checkbox-enchantment', label: 'エンチャント' },
  { id: 'checkbox-instant', label: 'インスタント' },
  { id: 'checkbox-sorcery', label: 'ソーサリー' },
  { id: 'checkbox-tribal', label: '同族' },
  { id: 'checkbox-battle', label: 'バトル' },
  { id: 'checkbox-planewalker', label: 'プレインズウォーカー' },
]

const checkedIds = ref<string[]>([])
const allGraveyardCreatureCount = ref<number>(0)
const myGraveyardCreatureCount = ref<number>(0)

const resetLuhrgyfCount = () => {
  checkedIds.value = []
  allGraveyardCreatureCount.value = 0
  myGraveyardCreatureCount.value = 0
}

const manaCount = ref<ManaCount>({
  white: {
    value: 0,
    color: 'bg-white text-black border-black',
  },
  blue: {
    value: 0,
    color: 'bg-blue-500 text-white border-black',
  },
  black: {
    value: 0,
    color: 'bg-black text-white border-black',
  },
  red: {
    value: 0,
    color: 'bg-red-500 text-white border-black',
  },
  green: {
    value: 0,
    color: 'bg-green-500 text-white border-black',
  },
  colorless: {
    value: 0,
    color: 'bg-gray-500 text-white border-black',
  },
})

const resetManaCount = () => {
  manaCount.value = {
    white: {
      ...manaCount.value.white,
      value: 0,
    },
    blue: {
      ...manaCount.value.blue,
      value: 0,
    },
    black: {
      ...manaCount.value.black,
      value: 0,
    },
    red: {
      ...manaCount.value.red,
      value: 0,
    },
    green: {
      ...manaCount.value.green,
      value: 0,
    },
    colorless: {
      ...manaCount.value.colorless,
      value: 0,
    },
  }
}

const emblemList = ref<Emblem[]>([])

const emblemText = computed(() => {
  return emblemList.value.map((emblem) => `${emblem.name}: ${emblem.count}`).join(', ')
})

const resetEmblemList = () => {
  emblemList.value = []
}

const spellCount = ref(0)

const isExcerciseRight = ref(false)

const toggleExcerciseRight = () => {
  isExcerciseRight.value = !isExcerciseRight.value
}

const bgColorIsExcerciseRight = computed(() => {
  return isExcerciseRight.value ? 'bg-green-600' : 'bg-gray-500'
})

const resetAll = () => {
  resetLuhrgyfCount()
  resetManaCount()
  resetEmblemList()
  spellCount.value = 0
  isExcerciseRight.value = false
}
</script>

<template>
  <header class="sticky top-0 flex bg-blue-500 p-1">
    <h1 class="flex-1 p-1 text-xl text-white font-bold">TCG Assist</h1>
    <button class="justify-end mr-2 text-white text-2xl" @click="resetAll">↻</button>
  </header>

  <main class="p-4">
    <div class="flex flex-col gap-4 w-full">
      <ModalButton modal="lhurgoyf" header-text="ルアゴイフカウンター" @click="handleClick">
        <p>
          カードタイプ: <span class="font-bold">{{ checkedIds.length }}</span> 種類
        </p>
        <div class="flex gap-4">
          <p>
            すべての墓地:
            <span class="font-bold">{{ allGraveyardCreatureCount }}</span>
          </p>
          <p>
            自分の墓地: <span class="font-bold">{{ myGraveyardCreatureCount }}</span>
          </p>
        </div>
      </ModalButton>

      <ModalButton modal="mana" header-text="マナカウンター" @click="handleClick">
        <div class="flex gap-4">
          <p>
            白: <span class="font-bold">{{ manaCount.white.value }}</span>
          </p>
          <p>
            青: <span class="font-bold">{{ manaCount.blue.value }}</span>
          </p>
          <p>
            黒: <span class="font-bold">{{ manaCount.black.value }}</span>
          </p>
          <p>
            赤: <span class="font-bold">{{ manaCount.red.value }}</span>
          </p>
          <p>
            緑: <span class="font-bold">{{ manaCount.green.value }}</span>
          </p>
          <p>
            無: <span class="font-bold">{{ manaCount.colorless.value }}</span>
          </p>
        </div>
      </ModalButton>

      <ModalButton modal="emblem" header-text="紋章管理" @click="handleClick">
        <p>
          紋章の数: <span class="font-bold">{{ emblemList.length }}</span>
        </p>
        <p class="w-80 truncate">
          {{ emblemText }}
        </p>
      </ModalButton>

      <hr class="text-gray-400" />

      <div class="flex items-center rounded p-2 h-12 bg-cyan-500">
        <p class="flex-1 text-white font-bold">呪文を唱えた回数</p>
        <NumberControl v-model="spellCount" class="h-8 w-32 justify-end bg-white" />
      </div>

      <button
        type="button"
        class="border p-2 rounded text-white font-bold transition duration-300 h-12"
        :class="bgColorIsExcerciseRight"
        @click="toggleExcerciseRight"
      >
        権利行使: <span class="font-bold">{{ isExcerciseRight ? '✓' : '⚪︎' }}</span>
      </button>

      <button type="button" class="border p-2 rounded h-12" @click="handleClick('dice')">
        ダイス
      </button>
    </div>

    <LuhrgoyfModal
      v-model:checkIds="checkedIds"
      v-model:allGraveyardCreatureCount="allGraveyardCreatureCount"
      v-model:myGraveyardCreatureCount="myGraveyardCreatureCount"
      :show="activeModal === 'lhurgoyf'"
      :items="LURGOYD_CHECKBOXES"
      @close="closeModal"
      @reset="resetLuhrgyfCount"
    />

    <ManaModal
      v-model:manaCount="manaCount"
      :show="activeModal === 'mana'"
      @close="closeModal"
      @reset="resetManaCount"
    />

    <EmblemModal
      v-model="emblemList"
      :show="activeModal === 'emblem'"
      @close="closeModal"
      @reset="resetEmblemList"
    />

    <DiceModal :show="activeModal === 'dice'" @close="closeModal" />
  </main>
</template>

<style scoped></style>
