<template>
    <div>
        <!-- Linelong->进度条整体的进度 -->
        <guided-tour 
          id="guided" 
          :Linelong="inlong"  
          :displayBool="isbeDrags" 
          :elementLoc = "loacguide / this.paperProgressWidth" 
          :pagemainsure = "paperProgressWidth"
        ></guided-tour>
          <div id="scroll-container" class="scroll-container">
            
            <div id="Maindisplay" class="scollelement" :style="{width: paperProgressWidth + 'px' }" @mousedown="startDrag">
                <page-ctrl
                  @addpage="addpageweight"
                  @Shedpage="Shedpageweight"
                ></page-ctrl>
                
                <!-- 用于动态生成连接线 -->
                <progress-link-line
                  v-for="(component) in Lineelement"
                  :key= component[2].id
                  :point= component
                  :indexline="component[2].id"
                ></progress-link-line>
                
                <!-- 用于最顶上的进度条 -->
                <progress-bar-main :Linelong="inlong" ></progress-bar-main>
                
                <!--用于动态生成元素-->
                <progress-element-drag
                    @toRightsrcoll= "srcollMove"
                    v-for="(component, index) in components"
                    :key="component.id"
                    :containerBound='container'
                    :index="index"
                    :elementleft= component.left
                    :elementtop = component.top
                    :boardwigth = paperProgressWidth
                    @deletchiropractic="deletprogress"
                    @bemove="upgradeProgressloc"
                    @wantBelink="createlinkline"
                    @expendboard="addpageweightex"
                ></progress-element-drag>

            </div>
            
        </div>
      <button-tool 
        style="z-index: 2;" 
        @create="CreateElement"
        ></button-tool>

    </div>
  </template>

  <script>

//导入组件 

  //生成用于页面长度的工具栏
  import pageCtrl from './MaindisplayComponents/pageCtrl.vue';
  
  //生成界面元素工具栏buttontool
  import buttonTool from './MaindisplayComponents/buttonTool.vue';

  //进程线组件
  import progressLinkLine from './MaindisplayComponents/progressLinkLine.vue';

  //可以拖动的任务单元组件
  import ProgressElementDrag from './MaindisplayComponents/ProgressElementDrag.vue';

  //最顶上的主任务条
  import ProgressBarMain from './ProgressBarMain.vue';

  //拖动页面时自动出现的导览条
  import guidedTour from './guidedTour.vue';

  //调用element-plus组件
  import { ElNotification } from 'element-plus'

  export default {
    
    //注册组件
    components: {
      ProgressBarMain,
      guidedTour,
      ProgressElementDrag,
      progressLinkLine,
      buttonTool,
      pageCtrl,
    },

    data() {
      return {
        //进度属性
        inlong: 24,

        //设定整体的长度px
        paperProgressWidth: 1400,//单位px 用于控制页面横向长度

        Mainloc: null, // 初始化为 null


        dragHandler: null, // 添加用于存储事件处理程序的属性
        stopHandler: null,
        elementsrcollLocation: 0,
        movePlus: 0, 
        
        //是否为拖动状态
        isbeDrags: false,
        dragTimeout: null, // 存储定时器 ID

        //用于progresselementDrag计数
        progresselementDrag_count: 0,

        //用于连接线的计数
        linkline_count: 0,

        //导览位置属性
        loacguide:0,

        //控制动态生成元素
        components:[],

        //container控制范围
        container: 0,


        highestZIndex: 0,

        //用于控制连接线的数组
        Lineelement:[],

        //用于保存 哪一个任务单元存在 哪一个 连接线的端点
        matchprogresstoline:{},

        //一个保存连接两点的位置的函数 当我点击任务条连接时，如果这个栈没有保存两个位置 ，就把点击的任务单元的位置 压栈
        //如果发现压栈完 后 保存了两个连接点位置 就动态生成连接点
        linkstack:[],

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

      const windowWidth = window.innerWidth;
      this.paperProgressWidth = windowWidth;


      this.plusMore = content/this.paperProgressWidth * content + 60;
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

        const windowWidth = window.innerWidth;
        const windowhigth = window.innerHeight;

        this.components.push(

          //压入一个带有left 和 top值的键值对 用于实时获取相应子组件的位置
          {left: -1 * this.container + windowWidth - 250 ,top: windowhigth - 350 , id: this.progresselementDrag_count++ },  

        );
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

        const move = document.getElementById('Maindisplay');
        this.loacguide = - move.getBoundingClientRect().left ;
        
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
      },

      /*
        # 2024/11/17
        # dreamsky
        index 为子组件的索引，知道索引就可以知道 哪一个子组件被拖动了
        left 为子组件被拖动后left的位置
        top 为子组件被拖动后的top位置
      */
      //接收的是一个数组 更新各个子组件的位置 三个属性值 index left top 依次排序
      upgradeProgressloc(locbemove){
        const indexin =  locbemove[0];
        this.components[indexin].left = locbemove[1];
        this.components[indexin].top = locbemove[2];
        console.log('bemove: index ',indexin, 'left ',locbemove[1],'top ',locbemove[2]);


        //寻找目标 --> 连接线端点 //通过indexin获取到了连接线的索引 用 this.Lineelement控制相应的连接线
        let goalLine_id = this.matchprogresstoline[indexin];
         
        //先判断lineelement数组内是否有元素能够被索引
        if(this.Lineelement.length && this.Lineelement[goalLine_id]){
          
          //更新连接线的 端点
          this.Lineelement[goalLine_id][0] = {left: locbemove[1] + 200, top: locbemove[2] + 60};
          this.Lineelement[goalLine_id][1] = {left: locbemove[1] + 200, top: locbemove[2] + 60};
        }
      },


      //生成任务连接线createlinkline
      /*
        # 2024/11/17
        # dreamsky

        index接收的为 任务单元的index索引
      */
      createlinkline(index){

        //设置标记形成 连接线唯一id
        let linkline_id = 0;

        //添加到映射表当中 [任务单元的index(也就是key值)”键“]  和  任务线的唯一key值”对“
        if(!(index in this.matchprogresstoline)){                       

          //对于每一个连接线设立唯一的 linkline_id 值
          linkline_id = this.linkline_count++;

          //添加到映射表当中 
          this.matchprogresstoline[index] = linkline_id;
        }else{
          //如果该元素已经被 添加过键值 就直接跳过该函数
          return;
        }

        //创建一个新的连接线 
        /*
          # 2024/11/17
          # dreamsky

          推入一个数组 
          第一个数组元素保存着 第一个端点的生成的位置
          第二个数组元素保存着 第二个端点的生成位置
          第三个数组元素保存着 生成的该连接线 为一的id值 用做key索引（用于之后增删查改）

        */ 
        this.Lineelement.push([
            {left: this.components[index].left + 200, top: this.components[index].top + 60},
            {left: this.components[index].left + 200, top: this.components[index].top + 60},
            {id: linkline_id}
          ],
        )
        console.log('createlinkline this.components[index].left',this.components[index].left);

      },

      //增加页面长度的回调函数
      addpageweight(){
        this.paperProgressWidth += 500;
      },

      addpageweightex(expendNumber){
        this.paperProgressWidth += expendNumber;
      },

      //减少页面长度
      Shedpageweight(){
        const windowWidth = window.innerWidth;
        if(this.paperProgressWidth > windowWidth){
          if(this.paperProgressWidth - windowWidth < 500){
            this.paperProgressWidth = windowWidth;
          }else{
            this.paperProgressWidth -= 500;
          }
        }else{
          ElNotification({
            title: '超过阈值',
            message: '页面已经达到最短',
            type: 'warning',
            // position: 'bottom-left',
          })
        }
      },


      
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
    display: flex;
    flex-direction: row; /* 设置主轴为水平方向 */
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
  