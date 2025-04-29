<script setup lang="ts">
import { useConfigStore } from '@renderer/stores/useConfigStore'
import { onMounted, ref } from 'vue'

const cameras = ref<MediaDeviceInfo[]>([])
const { config } = useConfigStore()

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  cameras.value = devices.filter((device) => device.kind === 'videoinput')
})
</script>
<template>
  <main class="w-screen h-screen bg-gray-800 p-6 pt-12">
    <h2 class="text-sm font-bold mb-4 text-center text-gray-50 opacity-80">参数设置</h2>
    <el-form label-position="top">
      <el-form-item label="摄像头">
        <el-select v-model="config.deviceId" clearable filterable placeholder="请选择摄像头">
          <el-option
            v-for="camera in cameras"
            :key="camera.deviceId"
            :label="camera.label"
            :value="camera.deviceId"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </main>
</template>
