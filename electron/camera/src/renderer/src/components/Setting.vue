<script setup lang="ts">
import { onMounted, ref } from 'vue'

const deviceId = ref('')
const cameras = ref<MediaDeviceInfo[]>([])

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  cameras.value = devices.filter((device) => device.kind === 'videoinput')
})
</script>
<template>
  <main class="w-screen h-screen bg-gray-900 p-6 pt-12">
    <h2 class="text-sm font-bold mb-4 text-center text-gray-50 opacity-80">参数设置</h2>
    <el-form
      label-position="top"
      @submit.prevent="
        () => {
          console.log('submit')
        }
      "
    >
      <el-form-item label="摄像头">
        <el-select v-model="deviceId" clearable filterable placeholder="请选择摄像头">
          <el-option
            v-for="camera in cameras"
            :key="camera.deviceId"
            :label="camera.label"
            :value="camera.deviceId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-full" native-type="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>
