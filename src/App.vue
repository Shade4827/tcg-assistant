<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import ModalButton from '@/components/ModalButton.vue'
import type { ModalId } from '@/types/type'

const activeModal = ref<ModalId | null>(null)

const handleClick = (id: ModalId) => {
  activeModal.value = id
}

const closeModal = () => {
  activeModal.value = null
}
</script>

<template>
  <h1>TCG Assist</h1>
  <ModalButton modal="user" @click="handleClick">
    <template #header>
      <h2>Menu</h2>
    </template>
    <template #body>
      <p>Menu body content</p>
    </template>
  </ModalButton>

  <BaseModal :show="activeModal === 'user'" @close="closeModal">
    <template #header>
      <h3>Custom Header</h3>
    </template>
  </BaseModal>
</template>

<style scoped></style>
