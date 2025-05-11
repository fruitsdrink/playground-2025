<script setup lang="ts">
import { VideoItem } from '@renderer/components'
import { useStore } from '@renderer/store'

const { config } = useStore()
</script>

<template>
  <main class="flex flex-col gap-2">
    <VideoItem v-for="(item, index) in config.files" :key="index" :video="item" :index="index" />
    <div v-if="config.files.length === 0" class="text-center text-xs text-slate-600 opacity-60">
      暂无压缩视频
    </div>
  </main>
</template>
