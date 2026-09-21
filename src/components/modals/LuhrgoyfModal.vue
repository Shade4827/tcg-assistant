<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue'

const props = defineProps<{
  show: boolean
  items: Array<{ id: string; label: string }>
  checkIds: string[]
  allGraveyardCreatureCount: number
  myGraveyardCreatureCount: number
}>()

const emit = defineEmits<{
  close: []
  'update:checkIds': [value: string[]]
  'update:allGraveyardCreatureCount': [value: number]
  'update:myGraveyardCreatureCount': [value: number]
  reset: []
}>()

const handleChange = (id: string) => {
  const value = props.checkIds.includes(id)
    ? props.checkIds.filter((item) => item !== id)
    : [...props.checkIds, id]

  emit('update:checkIds', value)
}
</script>

<template>
  <BaseModal :show="props.show" headerText="ルアゴイフカウンター" @close="emit('close')">
    <div class="grid grid-cols-2 gap-2 mb-2">
      <div v-for="item in items" :key="item.id" class="whitespace-nowrap">
        <input
          type="checkbox"
          :id="item.id"
          :checked="props.checkIds.includes(item.id)"
          class="mr-1"
          @change="handleChange(item.id)"
        />
        <label :for="item.id">{{ item.label }}</label>
      </div>
    </div>
    <div class="flex flex-col gap-2 mb-4">
      <div class="flex items-center gap-2">
        <p class="h-7 leading-7">すべての墓地のクリーチャーの総数:</p>
        <input
          type="number"
          min="0"
          step="1"
          :value="props.allGraveyardCreatureCount"
          class="border rounded h-7 leading-7 p-1 w-12 ml-auto text-right self-end"
          @change="
            emit(
              'update:allGraveyardCreatureCount',
              Number(($event.target as HTMLInputElement).value),
            )
          "
        />
      </div>
      <div class="flex items-center gap-2">
        <p class="h-7 leading-7">自分の墓地のクリーチャーの総数:</p>
        <input
          type="number"
          min="0"
          step="1"
          :value="props.myGraveyardCreatureCount"
          class="border rounded h-7 leading-7 p-1 w-12 ml-auto text-right self-end"
          @change="
            emit(
              'update:myGraveyardCreatureCount',
              Number(($event.target as HTMLInputElement).value),
            )
          "
        />
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <button type="button" class="border py-2 px-4 rounded" @click="emit('reset')">
        リセット
      </button>
    </div>
  </BaseModal>
</template>
