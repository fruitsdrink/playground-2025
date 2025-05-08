<script setup lang="ts">
import { ref } from 'vue'
import { CloseOne } from '@icon-park/vue-next'

const videos = ref([
  'video1.mp4',
  'video2.mp4',
  'video3.mp4',
  'video4.mp4',
  'video5.mp4',
  'video6.mp4',
  'video7.mp4',
  'video8.mp4',
  'video9.mp4',
  'video10.mp4'
])
</script>

<template>
  <main class="flex flex-col gap-2 overflow-y-auto h-76">
    <section
      v-for="(item, index) in videos"
      :key="index"
      class="bg-white px-3 py-2 rounded text-slate-600 flex justify-between items-center"
    >
      {{ item }}
      <div
        class="text-slate-500 opacity-20 cursor-pointer hover:text-orange-500 hover:opacity-80 hover:scale-110 duration-200"
      >
        <close-one theme="outline" size="20" />
      </div>
    </section>
  </main>
</template>
