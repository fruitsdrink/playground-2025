<script setup lang="ts">
import { ref } from 'vue'

const sizes = ref(['1920x1080', '1280x720', '1024x768', '800x600', '640x480', '480x320'])
const size = ref(sizes.value[0])

const frames = ref([60, 30])
const frame = ref(frames.value[0])
</script>

<template>
  <main class="bg-white p-3 flex gap-2 rounded">
    <el-select v-model="size" placeholder="请选择尺寸">
      <el-option
        v-for="(item, index) in sizes"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <el-select v-model="frame" placeholder="请选择帧数">
      <el-option
        v-for="(item, index) in frames"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </main>
</template>
<style scoped></style>
