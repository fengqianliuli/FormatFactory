<script setup>
import { defineExpose, ref } from 'vue';

    //Errorinfo 显示状态
    const disabled = ref(false)

    //点击校验Access后绑定动画状态
    const access = ref(false)

    //自持有引用
    const btnRef = ref(null)
    const errorInfoRef = ref(null)

    //暴露公共函数
    defineExpose({
        warnDisabled,
        accessClick,
        warnProcessing,
        reset,
    })


    //弹出参数不足警告
    function warnDisabled() {
      if(disabled.value || !disabled) {
          return
        }
        // const errorInfo = document.getElementById("errorInfo");
        // errorInfo.innerHTML = '请补全必要信息';
        //设置errorInfo元素的innerHTML
        errorInfoRef.innerHTML = '请补全必要信息';

        console.log("warnDisabled");
        disabled.value = true
        setTimeout(() => {
            disabled.value = false
        }, 1500)
    }

    //弹出进行中警告
    function warnProcessing() {
      if(disabled.value || !disabled) {
          return
        }
        errorInfoRef.innerHTML = '正在转换中，请稍后';
        console.log("warnProcessing");
        disabled.value = true
        setTimeout(() => {
            disabled.value = false
        }, 1500)
    }

    //状态恢复
    function reset() {
      btnRef.value.disabled = false
        disabled.value = false
        access.value = false
        console.log("reset");
        const startbtn = document.getElementById("startbtn");
        startbtn.innerHTML = '✔️';
        startbtn.style.backgroundColor = "green";
        startbtn.style.color = "white";
        setTimeout(() => {
            const startbtn = document.getElementById("startbtn");
            startbtn.innerHTML = '开始转换';
            startbtn.style.backgroundColor = "#4187f7";
            startbtn.style.color = "white";
            // startbtn.classList.remove("drop");
        }, 1000)
    }

    //符合条件，调用动画进行下一步
    function accessClick() {
      access.value = true
      //让button无法被点击
      btnRef.value.disabled = true
      // disabled.value = true
      console.log("允许通过");
    }  
</script>

<template>
    <div :class="{shake: disabled}">
      <span id="errorInfo" ref="errorInfoRef" v-if="disabled">请补全必要信息</span>
      <button ref="btnRef" id="startbtn" :class="{drop: access}">开始转换</button><br/>
    </div>
</template>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}


.drop {
  animation: button-animation 1s  forwards;
  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
}

.drop:hover {
  background-color: white;
  color: #4187f7;
}

@keyframes button-animation {
  0% {
    transform: translateY(0) scale(1);
    color: transparent;
  }
  50% {
    border-radius: 50%;
    transform: translateY(0px) scaleY(0.5) scaleX(0.3);
    color: transparent;
  }
  70% {
    transform: translateY(-10px) scaleY(0.4) scaleX(0.2) ;
    color: transparent;
  }
  80% {
    transform: translateY(35px) scaleY(0.6) scaleX(0.2);
    color: transparent;
  }
  90% {
    transform: translateY(25px) scale(0.3);
    color: transparent;
  }
  90% {
    transform: translateY(25px) scale(0.7);
    color: transparent;
  }
  100% {
    transform: translateY(50px) scaleX(1.0);
    color: transparent;
    border-radius: 50%;
  }
}

@keyframes reverse-button-animation {
  0% {
    transform: translateY(50px) scaleX(1.0);
    color: transparent;
    border-radius: 50%;
  }
  10% {
    transform: translateY(25px) scale(0.7);
    color: transparent;
  }
  20% {
    transform: translateY(25px) scale(0.3);
    color: transparent;
  }
  30% {
    transform: translateY(35px) scaleY(0.6) scaleX(0.2);
    color: transparent;
  }
  40% {
    transform: translateY(-10px) scaleY(0.4) scaleX(0.2) ;
    color: transparent;
  }
  50% {
    border-radius: 50%;
    transform: translateY(0px) scaleY(0.5) scaleX(0.3);
    color: transparent;
  }
  100% {
    transform: translateY(0) scale(1);
    color: transparent;
  }
}


#startbtn {
  background-color: #4187f7;
  border: 2px solid #4187f7;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

#startbtn:hover {
  background-color: white;
  color: #4187f7;
}

#startbtn:active {
  background-color: #bfbfbf;
  border-color: #bfbfbf;
} 
</style>