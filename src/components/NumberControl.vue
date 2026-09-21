<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const increment = () => {
  emit('update:modelValue', props.modelValue + 1)
}

const decrement = () => {
  if (props.modelValue <= 0) return
  emit('update:modelValue', props.modelValue - 1)
}
</script>

<template>
  <div class="relative rounded-xl border">
    <button
      type="button"
      class="absolute left-0 top-1/2 w-1/2 -translate-y-1/2 text-left pl-2 font-bold"
      @click="decrement"
    >
      −
    </button>

    <button
      type="button"
      class="absolute right-0 top-1/2 w-1/2 -translate-y-1/2 text-right pr-2 font-bold"
      @click="increment"
    >
      ＋
    </button>

    <span class="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl">
      {{ modelValue }}
    </span>
  </div>
</template>
