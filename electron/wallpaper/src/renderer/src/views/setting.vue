<script setup lang="ts">
import { ref } from 'vue'

const savePath = ref('')
</script>

<template>
  <main class="p-4">
    <h2 class="text-center py-4 text-base opacity-70 font-semibold">参数设置</h2>
    <section class="flex flex-col gap-4">
      <el-input v-model="savePath" placeholder="请选择图片保存目录" clearable></el-input>
      <el-button type="primary">选择图片保存目录</el-button>
    </section>
  </main>
</template>
