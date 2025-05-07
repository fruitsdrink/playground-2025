<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus'
import { http } from '@renderer/plugins/axios'
import { useConfigStore } from '@renderer/store'
import { useWallpaper } from '@renderer/composable/useWallpaper'

const imgRef = ref<HTMLImageElement>()
const isLoading = ref<boolean>(false)
const configStore = useConfigStore()
const isDownloadImaging = ref<boolean>(false)
const isSetWallpapering = ref<boolean>(false)

const { setWallpaper } = useWallpaper()
const loadImg = async (): Promise<void> => {
  if (!imgRef.value || isLoading.value) return

  isLoading.value = true
  const loading = ElLoading.service({
    background: 'rgba(255, 255, 255, 0.2)'
  })
  const res = await http.get('/')

  configStore.config.url = res.data
  imgRef.value.src = res.data
  imgRef.value.addEventListener('load', () => {
    loading.close()
    isLoading.value = false
  })
}

onMounted(() => {
  if (!configStore.config.url) {
    loadImg()
  }
})

const handleSetWallpaper = async (): Promise<void> => {
  try {
    isSetWallpapering.value = true
    await setWallpaper()
  } finally {
    isSetWallpapering.value = false
  }
}
const downloadImage = async (): Promise<void> => {
  try {
    isDownloadImaging.value = true
    await window.api.downloadImage(configStore.config.url, configStore.config.saveDirectory)
  } finally {
    isDownloadImaging.value = false
  }
}
</script>

<template>
  <main class="flex flex-col">
    <img
      ref="imgRef"
      :src="configStore.config.url"
      alt=""
      class="aspect-video no-drag cursor-pointer flex-1 object-cover"
      draggable="false"
      @click="loadImg"
    />
    <button
      class="bg-gray-200 my-4 text-center py-3 mx-4 rounded-md shadow-sm hover:bg-gray-300 cursor-pointer mt-6 text-base opacity-80 select-none disabled:cursor-not-allowed disabled:hover:bg-gray-200"
      :disabled="isSetWallpapering"
      @click="handleSetWallpaper"
    >
      设为壁纸
    </button>
    <div class="flex justify-end mx-4 mt-2">
      <button
        class="text-gray-700 hover:font-bold cursor-pointer disabled:cursor-not-allowed disabled:hover:font-normal"
        :disabled="isDownloadImaging"
        @click="downloadImage"
      >
        下载壁纸
      </button>
    </div>
  </main>
</template>
