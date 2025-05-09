<script setup lang="ts"></script>

<template>
  <main class="flex justify-between bg-gray-50 text-slate-600 px-3 py-2 drag shadow-sm">
    <section class="opacity-80 font-bold">水果饮料</section>
    <section class="flex justify-between gap-3 no-drag">
      <RouterLink :to="{ name: 'home' }" class="btn" active-class="active">转码</RouterLink>
      <RouterLink :to="{ name: 'setting' }" class="btn" active-class="active">配置</RouterLink>
    </section>
  </main>
</template>

<style scoped>
@import '../assets/tailwind.css' reference;

.btn {
  @apply cursor-pointer hover:opacity-80 duration-200 hover:scale-110 opacity-60;
}
.active {
  @apply opacity-80;
}
</style>
