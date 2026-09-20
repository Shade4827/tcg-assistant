<script setup lang="ts">
import { ref } from 'vue'
import ModalButton from '@/components/ModalButton.vue'
import LuhrgoyfModal from '@/components/modals/LuhrgoyfModal.vue'
import type { ModalId } from '@/types/type'

const activeModal = ref<ModalId | null>(null)

const handleClick = (id: ModalId) => {
  activeModal.value = id
}

const closeModal = () => {
  activeModal.value = null
}

const luhrgoyfCheckBoxes = [
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
</script>

<template>
  <h1>TCG Assist</h1>

  <ModalButton modal="lhurgoyf" headerText="ルアゴイフカウント" @click="handleClick">
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

  <LuhrgoyfModal
    v-model:checkIds="checkedIds"
    v-model:allGraveyardCreatureCount="allGraveyardCreatureCount"
    v-model:myGraveyardCreatureCount="myGraveyardCreatureCount"
    :show="activeModal === 'lhurgoyf'"
    :items="luhrgoyfCheckBoxes"
    @close="closeModal"
  />
</template>

<style scoped></style>
