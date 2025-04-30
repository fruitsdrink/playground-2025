<script setup lang="ts">
import { Pic as PicIcon, Config as ConfigIcon } from '@icon-park/vue-next'
</script>

<template>
  <nav class="px-3 py-2 flex justify-between items-center">
    <section>桌面壁纸</section>
    <section class="flex items-center gap-1">
      <PicIcon theme="outline" size="20" />
      <ConfigIcon theme="outline" size="20" />
    </section>
  </nav>
</template>
