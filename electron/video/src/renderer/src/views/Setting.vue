<script setup lang="ts">
import Card from '@renderer/components/Card.vue'
import FrameSizeSet from '@renderer/components/FrameSizeSet.vue'
</script>

<template>
  <main class="p-3 space-y-4 m-2">
    <Card title="分辨率">
      <FrameSizeSet type="size" placeholder="请选择分辨率" tip="格式如：1920x1080" />
    </Card>
    <Card title="帧数">
      <FrameSizeSet type="frame" placeholder="请选择帧数" tip="请输入数字" />
    </Card>
  </main>
</template>
