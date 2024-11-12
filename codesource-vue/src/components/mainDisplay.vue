<template>
    <div id="Maindisplay" @mousedown="startDrag">
      <progress-bar-main :Linelong="inlong"></progress-bar-main>
    </div>
  </template>
  
  <script>
  import ProgressBarMain from './ProgressBarMain.vue';
  
  export default {
    components: {
      ProgressBarMain,
    },
    data() {
      return {
        inlong: 1,
        Mainloc: null // 初始化为 null
      };
    },
    mounted() {
      // 在组件挂载后获取 DOM 元素
      this.Mainloc = document.getElementById('Maindisplay');
    },
    methods: {
      startDrag() {
        // 确保 Mainloc 已经被赋值
        if (this.Mainloc) {
          // 添加 mousemove 事件监听器，并确保事件对象被传递
          document.addEventListener('mousemove', this.onDrag);
          // 添加 mouseup 和 mouseleave 事件监听器，用于移除 mousemove 监听器
          document.addEventListener('mouseup', this.stopDrag);
          document.addEventListener('mouseleave', this.stopDrag);
        } else {
          console.error("Mainloc 未定义");
        }
      },
      onDrag(event) {
        // 在这里处理 mousemove 事件
        console.log('Dragging', event.clientX, event.clientY);
      },
      stopDrag() {
        // 移除 mousemove 和 mouseup 事件监听器
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
        document.removeEventListener('mouseleave', this.stopDrag);
      }
    }
  };
  </script>
  
  <style scoped>
  #Maindisplay {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 10000px;
  }
  </style>
  