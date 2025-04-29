<script setup lang="ts">
import { useConfigStore } from '@renderer/stores/useConfigStore'
import { onMounted } from 'vue'
import {
  InnerShadowTopLeft as InnerShadowTopLeftIcon,
  AlignmentRightTop as AlignmentRightTopIcon,
  AlignmentLeftTop as AlignmentLeftTopIcon,
  AlignmentRightBottom as AlignmentRightBottomIcon,
  AlignmentLeftBottom as AlignmentLeftBottomIcon,
  AlignmentHorizontalCenter as AlignmentCenterIcon
} from '@icon-park/vue-next'

// const devices = await navigator.mediaDevices.enumerateDevices()

const { config } = useConfigStore()

onMounted(async () => {
  const video = document.querySelector('video')!
  const loading = document.querySelector('#loading') as HTMLDivElement
  const constraints = {
    audio: false,
    video: {
      deviceId: config.deviceId,
      width: 1920,
      height: 1080
    }
    // eslint-disable-next-line no-undef
  } as MediaStreamConstraints

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream
    loading.style.display = 'none'
    video.classList.remove('hidden')
    video.play()
    // video.onloadedmetadata = (e) => {
    //   tip.style.display = 'none'
    //   video.classList.remove('hidden')
    //   video.play()
    // }
  })

  window.api.setWindowPosition({
    position: config.position,
    displayId: config.displayId
  })
})

const changeRound = (): void => {
  config.rounded = !config.rounded
  setWindowSize()
}
const setWindowSize = (): void => {
  if (config.rounded) {
    const width = config.width ?? 281
    const height = config.height ?? 281
    const min = Math.min(width, height)
    window.api.setWindowSize({
      aspectRatio: 1,
      width: min,
      height: min
    })
  } else {
    const width = config.width ?? 500
    let height = config.height ?? 281
    if (width === height) {
      height = width * (9 / 16)
    }
    window.api.setWindowSize({
      aspectRatio: 16 / 9,
      width,
      height
    })
  }
}

const changePosition = (
  value: 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom' | 'center'
): void => {
  window.api.setWindowPosition({
    position: value,
    displayId: config.displayId
  })
  config.position = value
}

setWindowSize()
</script>

<template>
  <main
    class="w-screen h-screen flex justify-center items-center overflow-hidden bg-white group"
    :class="{ 'rounded-full': config.rounded }"
  >
    <div id="loading">Loading...</div>
    <video class="object-cover h-full hidden" />
    <InnerShadowTopLeftIcon theme="outline" size="24" class="icon-bottom" @click="changeRound" />
    <AlignmentRightTopIcon
      theme="outline"
      size="16"
      class="absolute right-2 top-2 text-white opacity-80 hover:opacity-100 z-10 hidden group-hover:block cursor-pointer"
      @click="changePosition('rightTop')"
    />
    <AlignmentLeftTopIcon
      theme="outline"
      size="16"
      class="absolute left-2 top-2 text-white opacity-80 hover:opacity-100 z-10 hidden group-hover:block cursor-pointer"
      @click="changePosition('leftTop')"
    />
    <AlignmentRightBottomIcon
      theme="outline"
      size="16"
      class="absolute right-2 bottom-2 text-white opacity-80 hover:opacity-100 z-10 hidden group-hover:block cursor-pointer"
      @click="changePosition('rightBottom')"
    />
    <AlignmentLeftBottomIcon
      theme="outline"
      size="16"
      class="absolute left-2 bottom-2 text-white opacity-80 hover:opacity-100 z-10 hidden group-hover:block cursor-pointer"
      @click="changePosition('leftBottom')"
    />
    <AlignmentCenterIcon
      theme="outline"
      size="16"
      class="absolute left-1/2 top-1/2 text-white opacity-80 hover:opacity-100 z-10 hidden group-hover:block cursor-pointer"
      @click="changePosition('center')"
    />
  </main>
</template>

<style scoped>
@reference "tailwindcss";
.icon-bottom {
  @apply absolute text-white opacity-80 cursor-pointer z-10 bottom-4 left-1/2 transform -translate-x-1/2 hover:opacity-100 hidden group-hover:block;
}
</style>
