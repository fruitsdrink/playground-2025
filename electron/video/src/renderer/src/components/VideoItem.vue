<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import { useVideo } from '@renderer/composable/useVideo'
import { useStore } from '@renderer/store'
import { SelectFileOptions } from 'src/types'
import { computed, ref } from 'vue'

defineOptions({
  name: 'VideoItem'
})
const { video, index } = defineProps<{ video: SelectFileOptions; index: number }>()
const process = computed(() => {
  const file = config.files.find((item) => item.index === index)
  if (file) {
    return file.progress
  }
  return 0
})

const { config } = useStore()

const isCompressing = computed(() => {
  const file = config.files.find((item) => item.index === index)
  if (file) {
    return file.isCompressing
  }
  return false
})

const { removeFile } = useVideo()
</script>

<template>
  <main class="video" :style="`--p:${process}%`">
    <div class="title">{{ video.name }}</div>
    <div v-if="!isCompressing" class="icon" @click="removeFile(index)">
      <close-one theme="outline" size="20" />
    </div>
  </main>
</template>

<style scoped>
@import '@renderer/assets/tailwind.css' reference;

.video {
  @apply bg-white px-3 py-2 rounded text-slate-600 flex justify-between items-center relative overflow-hidden;
}

.video::before {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-blue-400;
  width: var(--p);
}

.video .title {
  @apply truncate z-10;
}
.video .icon {
  @apply text-slate-500 opacity-20 cursor-pointer hover:text-orange-500 hover:opacity-80 hover:scale-110 duration-200;
}
</style>
