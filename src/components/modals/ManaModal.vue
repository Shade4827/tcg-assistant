<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue'
import NumberControl from '@/components/NumberControl.vue'
import type { ManaCount } from '@/types/type'

const props = defineProps<{
  show: boolean
  manaCount: ManaCount
}>()

const emit = defineEmits<{
  close: []
  'update:manaCount': [value: ManaCount]
  reset: []
}>()
</script>

<template>
  <BaseModal :show="props.show" header-text="マナカウンター" @close="emit('close')">
    <div class="flex items-center mb-2">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(count, color) in props.manaCount" :key="color" class="flex items-center">
          <NumberControl
            :model-value="count.value"
            :class="count.color"
            class="w-32 h-24"
            @update:modelValue="
              (value: number) =>
                emit('update:manaCount', {
                  ...props.manaCount,
                  [color]: { ...props.manaCount[color], value },
                })
            "
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <button
        type="button"
        class="border py-2 px-4 rounded cursor-pointer hover:bg-slate-200 transition duration-300"
        @click="emit('reset')"
      >
        リセット
      </button>
    </div>
  </BaseModal>
</template>
