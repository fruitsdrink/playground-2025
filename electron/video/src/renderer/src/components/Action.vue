<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
import { useCompress } from '@renderer/composable/useCompress'
import { useVideo } from '@renderer/composable/useVideo'

const { selectFiles } = useVideo()
const { compress, isCompressing } = useCompress()

const handleUpload = async (): Promise<void> => {
  await selectFiles()
}
</script>
<template>
  <main class="">
    <section class="flex justify-center items-center gap-4">
      <div class="button" @click="handleUpload">
        <plus theme="outline" size="32" />
      </div>
      <div
        class="button"
        :class="{ disable: isCompressing }"
        @click="
          () => {
            if (isCompressing) return
            compress()
          }
        "
      >
        <update-rotation theme="outline" size="32" />
      </div>
    </section>
  </main>
</template>

<style scoped>
@import '../assets//tailwind.css' reference;

.button {
  @apply w-20 h-20 bg-white rounded-lg flex justify-center items-center cursor-pointer shadow-sm text-slate-600;
}
.disable {
  @apply opacity-50 cursor-not-allowed;
}
</style>
