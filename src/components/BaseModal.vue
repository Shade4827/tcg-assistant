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
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.show" class="outline rouded-md p-2">
        <div>
          <h3 v-if="props.headerText">{{ props.headerText }}</h3>

          <div>
            <slot />
          </div>

          <button
            @click="emit('close')"
            class="outline rounded-md p-2 hover:bg-slate-200 transition duration-300 flex justify-end"
          >
            close
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
