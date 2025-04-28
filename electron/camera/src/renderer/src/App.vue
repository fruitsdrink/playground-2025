<script setup lang="ts">
import Camera from '@renderer/components/Camera.vue'
import Setting from './components/Setting.vue'
import { ref } from 'vue'
import { Setting as SettingIcon, CameraFive as CameraFiveIcon } from '@icon-park/vue-next'

const page = ref<'camera' | 'setting'>('camera')
</script>

<template>
  <Suspense>
    <main class="relative">
      <section
        class="absolute left-1/2 -translate-x-1/2 mt-4 text-white opacity-80 cursor-pointer z-10 no-drag"
      >
        <SettingIcon v-if="page === 'camera'" theme="outline" size="24" @click="page = 'setting'" />
        <CameraFiveIcon v-else theme="outline" size="24" @click="page = 'camera'" />
      </section>
      <section class="drag">
        <Camera v-if="page === 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>
