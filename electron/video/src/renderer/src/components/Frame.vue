<script setup lang="ts">
import { useStore } from '@renderer/store'

const { config } = useStore()
</script>

<template>
  <main class="bg-white p-3 flex gap-2 rounded">
    <el-select v-model="config.size" placeholder="请选择尺寸">
      <el-option
        v-for="(item, index) in config.sizes"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <el-select v-model="config.frame" placeholder="请选择帧数">
      <el-option
        v-for="(item, index) in config.frames"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </main>
</template>
<style scoped></style>
