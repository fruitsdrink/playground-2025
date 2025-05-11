<script setup lang="ts">
import { Action, Frame, Button, VideoList } from '@renderer/components'
</script>

<template>
  <main class="flex flex-col px-4">
    <div>
      <Frame class="mt-4" />
      <Action class="mt-4" />
      <Button class="mt-4" />
    </div>
    <div class="mt-4 flex-1 max-h-76 overflow-y-auto">
      <VideoList class="" />
    </div>
  </main>
</template>

<style scoped></style>
