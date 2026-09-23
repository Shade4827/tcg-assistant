<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue'
import type { Emblem } from '@/types/type'

const props = defineProps<{
  show: boolean
  modelValue: Emblem[]
}>()

const emit = defineEmits<{
  close: []
  'update:modelValue': [value: Emblem[]]
  reset: []
}>()

const closeModal = () => {
  const filteredEmblems = props.modelValue.filter((emblem) => emblem.name.trim() !== '')
  emit('update:modelValue', filteredEmblems)
  emit('close')
}
</script>

<template>
  <BaseModal :show="props.show" header-text="紋章管理" @close="closeModal">
    <div class="flex flex-col gap-2 min-w-[340px] h-[400px] overflow-y-auto">
      <div
        v-for="(emblem, index) in props.modelValue"
        :key="index"
        class="flex shrink-0 items-center gap-2"
      >
        <input
          type="text"
          v-model="emblem.name"
          placeholder="紋章の名前"
          class="border rounded p-1 flex-1"
        />

        <input
          type="number"
          min="1"
          step="1"
          v-model.number="emblem.count"
          class="border rounded p-1 w-12 text-right"
        />

        <button
          type="button"
          class="border py-1 px-2 rounded cursor-pointer hover:bg-slate-200 transition duration-300"
          @click="
            emit(
              'update:modelValue',
              props.modelValue.filter((_, i) => i !== index),
            )
          "
        >
          削除
        </button>
      </div>
    </div>

    <div class="flex justify-center gap-2">
      <button
        type="button"
        class="border py-2 px-4 rounded flex-1 border border-gray-300 mt-2 cursor-pointer hover:bg-slate-200 transition duration-300"
        @click="emit('reset')"
      >
        リセット
      </button>

      <button
        type="button"
        class="border py-2 px-4 rounded flex-1 bg-blue-600 text-white mt-2 cursor-pointer hover:bg-blue-700 transition duration-300"
        @click="emit('update:modelValue', [...props.modelValue, { name: '', count: 1 }])"
      >
        + 紋章を追加
      </button>
    </div>
  </BaseModal>
</template>
