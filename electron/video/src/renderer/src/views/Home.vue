<script setup lang="ts">
import { Action, Frame, Button, VideoList } from '@renderer/components'
import { onMounted, ref } from 'vue'

const isCompressing = ref(false)

const handleCompress = (): void => {
  isCompressing.value = true
  window.api.compress()
}

onMounted(() => {
  window.api.registerOnCompressReply((arg: boolean) => {
    isCompressing.value = false
    console.log(arg)
  })
})
</script>

<template>
  <main class="flex flex-col px-4">
    <div>
      <Frame class="mt-4" />
      <Action class="mt-4" />
      <Button class="mt-4" />
    </div>
    <div class="mt-4 flex-1 max-h-76 overflow-y-auto">
      <VideoList class="" />
    </div>
    <div class="mt-5">
      <el-button
        type="primary"
        class="w-full"
        :disabled="isCompressing"
        :loading="isCompressing"
        @click="handleCompress"
        >开始压缩</el-button
      >
    </div>
  </main>
</template>

<style scoped></style>
