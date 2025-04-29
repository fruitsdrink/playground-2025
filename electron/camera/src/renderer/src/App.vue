<script setup lang="ts">
import Camera from '@renderer/components/Camera.vue'
import Setting from './components/Setting.vue'
import { onMounted, ref } from 'vue'
import { Setting as SettingIcon, CameraFive as CameraFiveIcon } from '@icon-park/vue-next'
import { useDrag } from './composable/useDrag'
import { useConfigStore } from './stores/useConfigStore'

const page = ref<'camera' | 'setting'>('camera')

const { drag } = useDrag()
const { config } = useConfigStore()

const quit = (): void => {
  window.api.quit()
}
onMounted(() => {
  drag.start()
})

window.api.setResize((width, height) => {
  config.width = width
  config.height = height
})

window.api.currentDisplayId((id: number) => {
  config.displayId = id
})
</script>

<template>
  <Suspense>
    <main class="relative group" @contextmenu.prevent="quit">
      <SettingIcon
        v-if="page === 'camera'"
        theme="outline"
        size="24"
        class="icon"
        @click="page = 'setting'"
      />
      <CameraFiveIcon v-else theme="outline" size="24" class="icon" @click="page = 'camera'" />

      <Camera v-if="page === 'camera'" />
      <Setting v-else />
    </main>
  </Suspense>
</template>

<style scoped>
@reference "tailwindcss";

.icon {
  @apply absolute text-white opacity-80 cursor-pointer z-10 top-4 left-1/2 transform -translate-x-1/2 hover:opacity-100 hidden group-hover:block;
}
</style>
