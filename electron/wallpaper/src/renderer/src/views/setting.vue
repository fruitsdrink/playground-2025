<script setup lang="ts">
import { useWallpaper } from '@renderer/composable/useWallpaper'
import { useConfigStore } from '@renderer/store'

const { config } = useConfigStore()
const { setSaveDirectory } = useWallpaper()
</script>

<template>
  <main class="p-4">
    <h2 class="text-center py-4 text-base opacity-70 font-semibold">参数设置</h2>
    <section class="flex flex-col gap-4">
      <el-input
        v-model="config.saveDirectory"
        placeholder="请选择图片保存目录"
        clearable
        readonly
      ></el-input>
      <el-button type="primary" @click="setSaveDirectory">选择图片保存目录</el-button>
    </section>
  </main>
</template>
