<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@renderer/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CloseOne } from '@icon-park/vue-next'

defineOptions({
  name: 'FrameSizeSet'
})

interface Props {
  type: 'size' | 'frame'
  placeholder?: string
  tip?: string
}

const { type, placeholder = '请选择', tip = '请输入' } = defineProps<Props>()

const { config } = useStore()

const list = computed(() => {
  return type === 'size' ? config.sizes : config.frames
})
const newValue = ref<string | number>('')

const add = (type: 'size' | 'frame'): void => {
  if (newValue.value) {
    if (type === 'size' && !/^\d+x\d+$/.test(newValue.value as string)) {
      ElMessage({
        message: '请输入正确的分辨率格式',
        type: 'error',
        grouping: true
      })
      return
    }
    if (type === 'frame' && isNaN(Number(newValue.value))) {
      ElMessage({
        message: '请输入正确的帧数',
        type: 'error',
        grouping: true
      })
      return
    }
    if (type === 'size') {
      if (config.sizes.includes(newValue.value as string)) {
        ElMessage({
          message: '分辨率已存在',
          type: 'error',
          grouping: true
        })
        return
      }

      config.sizes.push(newValue.value as string)
      // 排序
      config.sizes.sort((a, b) => {
        const [aWidth, aHeight] = a.split('x').map(Number)
        const [bWidth, bHeight] = b.split('x').map(Number)
        return bWidth * bHeight - aWidth * aHeight
      })
    }

    if (type === 'frame') {
      if (config.frames.includes(newValue.value as number)) {
        ElMessage({
          message: '帧数已存在',
          type: 'error',
          grouping: true
        })
        return
      }
      config.frames.push(newValue.value as number)
      // 排序
      config.frames.sort((a, b) => b - a)
    }

    ElMessage({
      message: '添加成功',
      type: 'success',
      grouping: true
    })
    newValue.value = ''
  }
}

const remove = async (type: 'size' | 'frame', index: number): Promise<void> => {
  await ElMessageBox.confirm('是否删除该选项')
  if (type === 'size') {
    config.sizes.splice(index, 1)
  } else {
    config.frames.splice(index, 1)
  }
}
</script>

<template>
  <main>
    <el-select :placeholder="placeholder">
      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label="item"
        :value="item"
        class="flex flex-ro items-center justify-between"
      >
        {{ item }}
        <close-one
          v-if="index > 1"
          theme="outline"
          size="20"
          class="text-slate-700 hover:text-red-500 hover:scale-110"
          @click="remove(type, index)"
        />
      </el-option>
    </el-select>
    <div class="flex items-center gap-2 mt-2">
      <el-input v-model="newValue" :placeholder="tip" clearable size="default" />
      <el-button type="primary" @click="add(type)">添加</el-button>
    </div>
  </main>
</template>
