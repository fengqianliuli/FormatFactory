<template>
  <div class="progress-bar" v-show="progress > 0">
    <div class="progress" :style="{ width: progress + '%', 'float': 'right', backgroundColor: progress >= 100 ? '#4caf50' : '#4187f7', transition: 'all 0.3s ease-in-out' }">
      <div class="progress-text">{{progress}}%</div>
    </div>
  </div>
  
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  props: {
    progress: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 100,
    },
    //添加一个回调入参，用于在进度条完成后执行回调函数
    callback: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const progress = ref(props.progress);

    /*
      下方代码块用于调试进度条
    */
    // watchEffect(() => {
    //   const interval = setInterval(() => {
    //     progress.value += 1;
    //     if (progress.value >= 100) {
    //       clearInterval(interval);
    //     }
    //   }, 50);s
    // });
    // watchEffect(() => {
    //   if (progress.value >= 100) {
    //     props.callback();
    //   }
    // });

    //进度满后调用回调函数
    watchEffect(() => {
      progress.value = props.progress;
      if (progress.value >= 100) {
        props.callback();
      }
    });
    return {
      progress,
    };
  },

  
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  position: relative;
}

.progress-text {
  position: absolute;
  top: 0;
  color: #fff;
  line-height: 40px;
  padding: 0 10px;
  font-size: 14px;
}
</style>
