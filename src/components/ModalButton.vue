<script setup lang="ts">
import type { ModalId } from '@/types/type'

const props = defineProps<{
  modal: ModalId
  headerText?: string
}>()

const emit = defineEmits<{
  click: [modal: ModalId]
}>()
</script>

<template>
  <div
    @click="emit('click', props.modal)"
    class="outline rounded-xl p-2 cursor-pointer hover:bg-slate-200 transition duration-300 w-92 h-24"
  >
    <h2 v-if="props.headerText" class="text-lg font-bold">{{ props.headerText }}</h2>
    <slot />
  </div>
</template>
