<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <main class="w-screen h-screen">
      <Navbar class="" />
      <RouterView />
    </main>
  </el-config-provider>
</template>
