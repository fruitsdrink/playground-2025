<script setup lang="ts">
import { Navbar, Action, Frame, Button, VideoList, Copyright } from '@renderer/components'
</script>

<template>
  <main class="flex flex-col justify-between h-screen">
    <div>
      <Navbar />
      <Frame class="mt-5 mx-4" />
      <Action class="mt-5" />
      <Button class="mt-5" />
      <VideoList class="mt-5 mx-3" />
    </div>
    <Copyright class="" />
  </main>
</template>

<style scoped></style>
