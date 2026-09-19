<script setup lang="ts">
import type { ModalId } from '@/types/type'

const props = defineProps<{
  modal: ModalId
}>()

const emit = defineEmits<{
  click: [modal: ModalId]
}>()
</script>

<template>
  <div @click="emit('click', props.modal)" class="outline">
    <slot name="header" />
    <slot name="body" />
  </div>
</template>
