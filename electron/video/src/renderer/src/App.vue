<script setup lang="ts">
import { Navbar, Copyright } from '@renderer/components'
</script>

<template>
  <main class="flex flex-col justify-between h-screen">
    <Navbar />
    <RouterView class="flex-1" />
    <Copyright class="" />
  </main>
</template>

<style scoped></style>
