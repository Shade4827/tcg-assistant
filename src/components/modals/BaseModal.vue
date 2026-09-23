<script setup lang="ts">
const props = defineProps<{
  show: boolean
  headerText?: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="emit('close')" />

      <div class="relative z-10 flex flex-col rounded-lg bg-white m-4 p-4">
        <h3 v-if="props.headerText" class="text-lg font-bold mb-4">{{ props.headerText }}</h3>

        <button @click="emit('close')" class="absolute top-2.5 right-4 text-3xl cursor-pointer">
          ×
        </button>

        <div>
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
