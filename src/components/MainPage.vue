<script setup>
  import { ref, reactive } from 'vue'
  import { Button, Cell, CellGroup, DropdownMenu, DropdownItem, Progress } from 'vant'
  import StartBtn from './StartBtn.vue';
  import Progresser from './Progresser.vue'


  const filePath = ref('')
  const dirPath = ref('')
  const targetFormat = ref('mp4')
  const formatList = reactive([
    { text: 'MP4', value: 'mp4' },
    { text: 'AVI', value: 'avi' },
    { text: 'MKV', value: 'mkv' },
  ])
  const convertProcess = ref(0)
  const processColor = ref('#4187f7')

  // component refrences
  const startButtonRef = ref(null)
  const progresserRef = ref(null)


  const openFileDiag = async () => {
    filePath.value = await window.electronAPI.openFile()
  }

  const openDirDiag = async () => {
    dirPath.value = await window.electronAPI.openDir()
  }

  const recoverBtn = () => {
    console.log('recoverBtn')
    if (startButtonRef.value) {
    startButtonRef.value.reset()
  }
    // startButtonRef.value.reset()
  }

  const startConvert = async () => {
    if (filePath.value === '' || dirPath.value === '' ) {
      // alert('请选择文件和目录')
      startButtonRef.value.warnDisabled()
      console.log('请选择文件和目录')
      return
    }
    // if (convertProcess.value > 0 && convertProcess.value < 100) {
    //   startButtonRef.value.warnProcessing()
    //   console.log('请稍后再试试吧')
    //   return
    // }
    
    if (startButtonRef.value) {
      startButtonRef.value.accessClick()
    }

    window.electronAPI.onProgress((precess) => {
      console.log('precess', precess)
      convertProcess.value = precess
      if (precess === 100) {
        processColor.value = '#008000'
      }
    })

    await window.electronAPI.startConvert(filePath.value, dirPath.value, targetFormat.value)
  }
</script>

<template>
  <div id="base">
    <h2>视频格式转换</h2>


  <CellGroup inset>
    <Cell title="源文件路径：" :value="filePath" />
    <Cell title="" label="选择你想要转换格式的视频源文件" >
      <Button @click="openFileDiag">选择文件</Button>
    </Cell>
  </CellGroup>

  <CellGroup inset>
    <Cell title="目标格式：">

    </Cell>
    <DropdownMenu>
      <DropdownItem v-model="targetFormat" :options="formatList" />
    </DropdownMenu>
  </CellGroup>

  <CellGroup inset>
    <Cell title="输出目录：" :value="dirPath" />
    <Cell title="" label="选择你想要保存的目录" >
      <Button @click="openDirDiag">选择目录</Button>
    </Cell>
  </CellGroup>

  <CellGroup inset>
    <Cell title="转换进度：">
      
    </Cell>
    <div style="display: flex; justify-content: flex-end; overflow: hidden; ">
      <StartBtn ref="startButtonRef" type="primary" @click="startConvert">开始转换</StartBtn>
    </div>
    <Progresser ref="progresserRef" :progress="parseInt(convertProcess)" :callback="recoverBtn"></Progresser>

    <!-- <Cell v-if="convertProcess > 0">
      <Progress :percentage="parseInt(convertProcess)" stroke-width="12" :color=processColor> </Progress>
    </Cell> -->
  </CellGroup>

</div>
</template>

<style scoped>
  /* 将所有div距离左边30% */
  #base {
    margin-left: 10%;
    margin-right: 10%;
  }
</style>