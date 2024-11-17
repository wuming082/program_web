<template>
    <div>
        <guided-tour id="guided" :Linelong="inlong"  :displayBool="isbeDrags" :elementLoc = "(loacguide + 1000) / paperProgressWidth * 100 " ></guided-tour>
          <div id="scroll-container" class="scroll-container">
            <div id="Maindisplay" class="scollelement" :style="{width: paperProgressWidth + 'px' }" @mousedown="startDrag">
                
                <!--测试按钮--->
                <el-button  id="buttonCreate" type="success" @click="CreateElement">create</el-button>

                <!-- 用于最顶上的进度条 -->
                <progress-bar-main :Linelong="inlong" ></progress-bar-main>
                
                <!--用于动态生成元素-->
                <progress-element-drag
                    @toRightsrcoll= "srcollMove"
                    v-for="(component, index) in components"
                    :key="component.id"
                    :containerBound='container'
                    :index="index"
                    @deletchiropractic="deletprogress"
                ></progress-element-drag>

            </div>

        </div>
    </div>
  </template>

  <script>

//导入组件 

  //可以拖动的任务单元组件
  import ProgressElementDrag from './MaindisplayComponents/ProgressElementDrag.vue';

  //最顶上的主任务条
  import ProgressBarMain from './ProgressBarMain.vue';

  //拖动页面时自动出现的导览条
  import guidedTour from './guidedTour.vue';

  export default {
    
    //注册组件
    components: {
      ProgressBarMain,
      guidedTour,
      ProgressElementDrag
    },

    data() {
      return {
        //进度属性
        inlong: 24,

        //设定整体的长度px
        paperProgressWidth: 10000,//单位px 用于控制页面横向长度

        Mainloc: null, // 初始化为 null


        dragHandler: null, // 添加用于存储事件处理程序的属性
        stopHandler: null,
        elementsrcollLocation: 0,
        movePlus: 0, 
        
        //是否为拖动状态
        isbeDrags: false,
        dragTimeout: null, // 存储定时器 ID

        //导览位置属性
        loacguide:0,

        //控制动态生成元素
        components:[],

        //container控制范围
        container: 0,


        highestZIndex: 0,
      };
    },
    watch:{

    },

    //生命周期钩子
    /*
      # 2024/11/17
      # dreamsky
      当此组件在网页当中完成所有元素渲染之后
      mounted()就会开始执行，来完成最后的成员变量加载
    */
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

      this.Mainloc.addEventListener('mousemove',this.updateBoundcontainer);

      

    },
    methods: {

      //拖动条向右移动 当任务单元被拖出窗口右侧左侧时，背景页面也需跟着移动
      srcollMove(option,extent){//option用于控制向左还是向右移动  extent用于控制移动的速度
        console.log(option);
        this.element = document.getElementById('scroll-container');
        if(option){
          this.element.scrollLeft += 2 * extent / 10;
        }else{
          this.element.scrollLeft -= 2 * extent / 10; 
        }
        
      },

      //回调 获取任务展示页面最左侧到窗口最左侧的距离 ，用于拖动展示页面内的任务单元
      updateBoundcontainer(){
        //获取容器左侧范围
        const container = document.getElementById('Maindisplay');
        this.container = container.getBoundingClientRect().left;
      },

      //生成按钮函数
      /*
        # 2024/11/17
        # dreamsky

        这个是用于控制 任务单元组件 的生成函数
        如何动态生成一个 任务单元组件 
        this.components 是一个数组 用 v-for 来让vue 去遍历整个数组时创建 任务单元组件
        this.components 里有几个元素 v-for 就会创建几个组件

        所以不论用何种方法，只要让this.components这个数组的元素增加或者减少 都会动态的调整
        在页面上 显示的 任务单元组件的个数
      */ 
      CreateElement(){
        this.components.push({
          id: this.highestZIndex ++
        });
      },

      //开始拖动回调
      startDrag(event) {
        //event.preventDefault();
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

      //开始拖动  // 页面背景拖动 //
      /*
        # 2024/11/17
        # dreamsky

        具体原理
        传入一个在·鼠标按下时·的坐标，然后在函数内部再去实时捕捉鼠标按下之后移动的坐标
        形成坐标差。获取坐标差后
        利用element.style.top/element.style.left来去控制任务单元的位置，从而
        实现被拖动的效果

        onDrag( 被点击时鼠标的坐标 , 传入的事件 )
      */
      onDrag(shiftX, event) {
        this.setDragTime();
        const Moveat = event.clientX;
        //获取拖动条的位置
        this.element = document.getElementById('scroll-container');
        //累加位移
        this.element.scrollLeft = (shiftX - Moveat) +  this.movePlus;
        this.elementsrcollLocation = this.element.scrollLeft;
        this.loacguide = this.elementsrcollLocation ;
      },

      //停止回调 移除相应的监听事件 这样页面就不会跟着你的鼠标移动了
      stopDrag() {

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
      /*
        # 2024/11/17
        # dreamsky
        拖动页面时会出现导览组件，这个计时器就会用于 控制导览组件的出现与消失

        当页面被拖动时 this.isbeDrags会被赋值成 true 并传递到导览组件内部
        导览组件出现 并且 在页面被拖动时会触发 setDragTime() 
        setDragTime() 的作用就是 记录你在一定时间内有没有拖动页面

        意思就是 当你拖动页面后 导览组件出现 并且开始一个计时器（如3s计时） 如果
        你在3s内再次拖动了页面 那么计时器就会重置计时 重新开始计时3s 
        如果你在3s没有再次拖动页面 计时器3s过后就会出发 将this.isbeDrags赋值成 false
        也就是告知 导览组件不再显示

        相当于给导览组件添加了一个延时属性
      */
      setDragTime(){
        this.removeDragtime(); // 每次设置新定时器之前清除旧的定时器
        this.dragTimeout = setTimeout(() => {
            this.isbeDrags = false; // 设置为 false，使元素隐藏
        }, 2000);
      },
      removeDragtime(){
        if(this.dragTimeout){
            clearTimeout(this.dragTimeout); // 清除定时器
            this.dragTimeout = null;
        }
      },

      /*
        # 2024/11/17
        # dreamsky
      */
      //问题代码 先别动 动了出BUG
      bringToFront(index){
        this.highestZIndex += 1; 
        this.components[index].zIndex = this.highestZIndex;
      },

      //用于删除任务单元回调函数 deletprogress(index)
      /*
        技术原理
        <progress-element-drag
            @toRightsrcoll= "srcollMove"
            v-for="(component, index) in components"
            :key="component.id"
            :containerBound='container'
            :progressextent="this.progressDisplay"
            :index="index"
            **@deletchiropractic="deletprogress"**
        ></progress-element-drag>

        其中@deletchiropractic="deletprogress'
        目的就是监听任务单元子组件是否传来deletchiropractic
        如果监听到相应事件就开始回调 deletprogress
        deletprogress接收一个子组件传来的index，index就是动态创建子组件时的索引
        
        也就是说子组件告诉父组件，自己想要被删除，并且给出了index数组索引
        this.components.splice(index,1) 进行相应索引的删除
        目标子组件就会被删除

        v-for="(component, index) in components"  |
        :key="component.id"                       |————> 其中这个就是动态创建子组件最主要的部分
        :index="index"                            |

      */
      deletprogress(index){
        this.components.splice(index,1);
      }
      
    }
  };
  </script>
  
<style scoped>
  #buttonCreate{
    position: absolute;
    margin: 30px;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  #Maindisplay {
    z-index: 1;
    position: absolute;
    top: 0px;
    bottom: 0px;
  }

  .scroll-container{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    overflow: hidden;
  }
  .scollelement{
    position: absolute;
    top: 0px;
    bottom: 0px;    
    left: 0px;
    background-color: rgb(247, 247, 247);
     /* 设置背景颜色为灰色 */ 
    background-image: radial-gradient(#c4c2c7f0 1px, transparent 2px);
    /* 创建点的效果 */ 
    background-size: 25px 25px; 
    /* 设置点的间距 */
  }
  </style>
  