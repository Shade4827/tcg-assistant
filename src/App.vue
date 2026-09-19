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
  <ModalButton modal="user" headerText="User Menu" @click="handleClick">
    <p>Menu body content</p>
  </ModalButton>

  <BaseModal
    :show="activeModal === 'user'"
    :headerText="activeModal === 'user' ? 'User Menu' : undefined"
    @close="closeModal"
  >
  </BaseModal>
</template>

<style scoped></style>
