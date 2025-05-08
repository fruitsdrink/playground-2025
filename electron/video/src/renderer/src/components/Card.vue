<script setup lang="ts">
interface Props {
  title: string
}
defineOptions({
  name: 'Card'
})

const { title } = defineProps<Props>()
</script>

<template>
  <section>
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
@import '@renderer/assets/tailwind.css' reference;

section {
  @apply bg-white p-3 rounded;
}
section h2 {
  @apply text-slate-700 opacity-80 mb-2;
}
</style>
