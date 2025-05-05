<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus'
import { http } from '@renderer/plugins/axios'

const imgRef = ref<HTMLImageElement>()
const isLoading = ref<boolean>(false)

const loadImg = async (): Promise<void> => {
  if (!imgRef.value || isLoading.value) return

  isLoading.value = true
  const loading = ElLoading.service({
    background: 'rgba(255, 255, 255, 0.2)'
  })
  const res = await http.get('/')

  imgRef.value.src = res.data
  imgRef.value.addEventListener('load', () => {
    loading.close()
    isLoading.value = false
  })
}

onMounted(() => {
  loadImg()
})
</script>

<template>
  <main class="flex flex-col">
    <img
      ref="imgRef"
      src=""
      alt=""
      class="aspect-video no-drag cursor-pointer flex-1 object-cover"
      draggable="false"
      @click="loadImg"
    />
    <div
      class="bg-gray-200 my-4 text-center py-3 mx-4 rounded-md shadow-sm hover:bg-gray-300 cursor-pointer mt-6 text-base opacity-80"
    >
      设为壁纸
    </div>
    <div class="flex justify-end mx-4 mt-6">
      <div class="text-gray-700 hover:font-bold cursor-pointer">下载壁纸</div>
    </div>
  </main>
</template>
