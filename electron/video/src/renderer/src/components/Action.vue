<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
</script>
<template>
  <main class="">
    <section class="flex justify-center items-center gap-4">
      <div class="button">
        <plus theme="outline" size="32" />
      </div>
      <div class="button">
        <update-rotation theme="outline" size="32" />
      </div>
    </section>
  </main>
</template>
<style scoped>
@import '../assets//tailwind.css' reference;

.button {
  @apply w-20 h-20 bg-white rounded-lg flex justify-center items-center cursor-pointer shadow-sm text-slate-600;
}
</style>
