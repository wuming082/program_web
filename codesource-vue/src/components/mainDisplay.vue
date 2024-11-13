<template>
    <div>
        <guided-tour id="guided" :Linelong="inlong"  :displayBool="isbeDrags" :elementLoc = "(loacguide + 1000) / paperProgressWidth * 100 " ></guided-tour>
        <div id="scroll-container" class="scroll-container">
            <div id="Maindisplay" class="scollelement" :style="{width: paperProgressWidth + 'px'}" @mousedown="startDrag">
                <progress-bar-main :Linelong="inlong" ></progress-bar-main>
            </div>
        </div>
    </div>
  </template>
  <script>
  import ProgressBarMain from './ProgressBarMain.vue';
  import guidedTour from './guidedTour.vue';

  export default {
    components: {
      ProgressBarMain,
      guidedTour
    },
    data() {
      return {
        //进度属性
        inlong: 90,

        //设定整体的长度px
        paperProgressWidth: 10000,
        Mainloc: null, // 初始化为 null
        dragHandler: null, // 添加用于存储事件处理程序的属性
        stopHandler: null,
        elementsrcollLocation: 0,
        movePlus: 0, 
        
        //是否为拖动状态
        isbeDrags: false,
        dragTimeout: null, // 存储定时器 ID

        //导览位置属性
        loacguide:0
      };
    },
    watch:{

    },
    mounted() {
      // 在组件挂载后获取 DOM 元素
      this.Mainloc = document.getElementById('Maindisplay');
      // 绑定事件处理程序的上下文
      this.dragHandler = (event) => this.onDrag(this.shiftX, event);
      this.stopHandler = () => this.stopDrag();

      const container = document.getElementById('scroll-container');
      const content = container.clientWidth;

      this.plusMore = content/this.paperProgressWidth * content + 60;
      console.log('content',this.plusMore);

    },
    methods: {
      startDrag(event) {
        event.preventDefault();
        if(event.button == 0){

            this.isbeDrags = true;

            this.shiftX = event.clientX; 
        // 确保 Mainloc 已经被赋值
        if (this.Mainloc) {
          // 添加 mousemove 事件监听器，并确保事件对象被传递
          document.addEventListener('mousemove', this.dragHandler);
          // 添加 mouseup 和 mouseleave 事件监听器，用于移除 mousemove 监听器
          document.addEventListener('mouseup', this.stopHandler);
          document.addEventListener('mouseleave', this.stopHandler);
        } else {
          console.error("Mainloc 未定义");
        }
        }
      },
      onDrag(shiftX, event) {
        this.setDragTime();

        console.log('Dragging', shiftX, event.clientX, event.clientY);

        const Moveat = event.clientX;

        //获取拖动条的位置
        this.element = document.getElementById('scroll-container');

        console.log('scrollinfo', this.element.scrollLeft);
        
        //累加错误
        this.element.scrollLeft = (shiftX - Moveat) +  this.movePlus;

        this.elementsrcollLocation = this.element.scrollLeft;

        console.log('elementsrcollLocation',this.elementsrcollLocation,'shiftX - Moveat',shiftX - Moveat);

        this.loacguide = this.elementsrcollLocation ;
        

      },
      stopDrag() {

        console.log('srcollLocation', this.loacguide,'paperProgressWidth',this.paperProgressWidth);

        this.movePlus =  this.elementsrcollLocation;
        // 确保事件处理程序已被正确绑定和存储
        if (this.dragHandler && this.stopHandler) {
          // 移除 mousemove 和 mouseup 事件监听器
          document.removeEventListener('mousemove', this.dragHandler);
          document.removeEventListener('mouseup', this.stopHandler);
          document.removeEventListener('mouseleave', this.stopHandler);
        }

      },

      //计时器用于控制是否隐藏导览组件
      setDragTime(){
        this.removeDragtime(); // 每次设置新定时器之前清除旧的定时器
        this.dragTimeout = setTimeout(() => {
            this.isbeDrags = false; // 设置为 false，使元素隐藏
        }, 1000);
      },
      removeDragtime(){
        if(this.dragTimeout){
            clearTimeout(this.dragTimeout); // 清除定时器
            this.dragTimeout = null;
        }
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

  .scroll-container{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    overflow: auto;
  }
  .scollelement{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
  }
  </style>
  