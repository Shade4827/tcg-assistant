<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.show">
        <div>
          <div>
            <slot name="header">default header</slot>
          </div>

          <div>
            <slot name="body">default body</slot>
          </div>

          <div>
            <slot name="footer">
              default footer
              <button @click="emit('close')">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
