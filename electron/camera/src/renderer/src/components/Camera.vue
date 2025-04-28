<script setup lang="ts">
import { onMounted } from 'vue'

// const devices = await navigator.mediaDevices.enumerateDevices()

onMounted(async () => {
  const video = document.querySelector('video')!
  const tip = document.querySelector('#tip') as HTMLDivElement
  const constraints = {
    audio: false,
    video: true
    // eslint-disable-next-line no-undef
  } as MediaStreamConstraints

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream
    tip.style.display = 'none'
    video.classList.remove('hidden')
    video.play()
    // video.onloadedmetadata = (e) => {
    //   tip.style.display = 'none'
    //   video.classList.remove('hidden')
    //   video.play()
    // }
  })
})
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div id="tip">Camera</div>
    <video class="object-cover w-full h-full hidden" />
  </main>
</template>
