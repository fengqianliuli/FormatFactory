<script setup>
  import { ref } from 'vue'
  const filePath = ref('')
  const dirPath = ref('')
  const targetFormat = ref('mp4')
  const convertProcess = ref(0)

  const openFileDiag = async () => {
    filePath.value = await window.electronAPI.openFile()
  }

  const openDirDiag = async () => {
    dirPath.value = await window.electronAPI.openDir()
  }

  const startConvert = async () => {
    if (filePath.value === '' || dirPath.value === '') {
      alert('请选择文件和目录')
      return
    }
    window.electronAPI.onProgress((precess) => {
      convertProcess.value = precess
    })

    await window.electronAPI.startConvert(filePath.value, dirPath.value, targetFormat.value)
  }
</script>

<template>
  <div>
    <h2>视频格式转换</h2>
  </div>
  <hr>
  <div>
    <p>文件路径：{{ filePath }}</p>
    <button @click="openFileDiag">选择文件</button>
  </div>
  <hr>
  <div>
    <p>目标转换格式：{{ targetFormat }}</p>
    <select v-model="targetFormat">
      <option>mp4</option>
      <option>avi</option>
      <option>mkv</option>
    </select>
  </div>
  <hr>
  <div>
    <p>输出目录： {{ dirPath }}</p>
    <button @click="openDirDiag">选择目录</button>
  </div>
  <hr>
  <div>
    <button @click="startConvert">开始转换</button>
    <p v-if="convertProcess > 0">转换进度：{{ convertProcess }} %</p>
  </div>
</template>

<style scoped>
  
</style>