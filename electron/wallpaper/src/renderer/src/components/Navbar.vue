<script setup lang="ts">
import { Pic as PicIcon, Config as ConfigIcon } from '@icon-park/vue-next'
</script>

<template>
  <nav
    id="navbar"
    class="px-3 py-2 flex justify-between items-center drag opacity-50 bg-gray-800 w-full text-white/80"
  >
    <section>桌面壁纸</section>
    <section class="flex items-center gap-2">
      <PicIcon
        theme="outline"
        size="20"
        class="no-drag cursor-pointer text-gray-500 hover:shadow-md hover:text-gray-200"
        :class="{ iconColor: $route.name === 'home' }"
        @click="$router.push('/')"
      />
      <ConfigIcon
        theme="outline"
        size="20"
        class="no-drag cursor-pointer text-gray-500 hover:shadow-md hover:text-gray-200"
        :class="{ iconColor: $route.name === 'setting' }"
        @click="$router.push('/setting')"
      />
    </section>
  </nav>
</template>

<style scoped>
@import '../assets//tailwind.css' reference;

.iconColor {
  @apply text-gray-200;
}
</style>
