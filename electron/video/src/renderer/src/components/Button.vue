<script setup lang="ts">
import { useVideo } from '@renderer/composable/useVideo'
import { useStore } from '@renderer/store'
import { computed } from 'vue'

const { removeAll } = useVideo()
const { config } = useStore()

const isCompressing = computed(() => {
  return config.files.some((item) => item.isCompressing)
})
</script>

<template>
  <main class="flex justify-center items-center">
    <el-button type="primary" size="small" :disabled="!isCompressing || !config.files.length"
      >停止转码</el-button
    >
    <el-button
      type="danger"
      size="small"
      :disabled="isCompressing || !config.files.length"
      @click="removeAll"
      >删除全部</el-button
    >
  </main>
</template>
