<script setup lang="ts">
import { ref } from 'vue'
import { VideoItem } from '@renderer/components'

const videos = ref([
  '如果使用的是VSCode进行开发，可以去检查下已启用的插件列表，看下列表里是否同时启用了插件：Volar和Vue official，参考Vue官方的文档说明，在VSCode中开发Vue3时，应使用Vue official插件并禁用掉Volar插件',
  '如果使用的是VSCode进行开发，可以去检查下已启用的插件列表，看下列表里是否同时启用了插件：Volar和Vue official，参考Vue官方的文档说明，在VSCode中开发Vue3时，应使用Vue official插件并禁用掉Volar插件'
])
</script>

<template>
  <main class="flex flex-col gap-2 overflow-y-auto h-76">
    <VideoItem v-for="(item, index) in videos" :key="index" :video="{ title: item }" />
  </main>
</template>
