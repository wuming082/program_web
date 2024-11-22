<template>
    <div ref="element" :style="{ height: elementHeight + 'px' , left: elementleft + 'px' , top: elementtop + 'px'}" id="element">
        <div id="Dragelement" @mousedown="startDrag">
            <el-progress id="insideProgress1" color="#BDBDBD" :text-inside="true" :stroke-width="23" :percentage="70" />
        </div>
        <h1 id="text" v-if="!displayinput" @click="textinputClick">{{progressneme}}</h1>
        <input v-if="displayinput"
            autocomplete="off"
            ref="inputref" id="inputborad"
            @keyup="Headerskeyup" 
            @click="inputfocus"
            v-model="progressinput" 
            placeholder= 'please input name'
        >

        <!-- 用于删除自身内部inside组件和删除自身的按钮 Test-->
        <el-icon 
            id="deletinsideelement" 
            :size="15" 
            @click="deletProgress"
            ><Delete />
        </el-icon>

        <!-- 用于生成连接线的按钮 Test 测试中 有BUG -->
        <!-- <el-icon
            id="deletinsideelement" 
            :size="15" 
            @click="LinkProgress"
            ><Share />
        </el-icon> -->

        <progress-element-draginside-display
            v-for="(component, index) in components"
            :key="index"
            :heightLoc= "component.top"
            :countlist = "index"
        >
        </progress-element-draginside-display>
        <div id="bottomelement">
            <div id="addbotton" @click="addbotton">
                <el-icon id="iconP"><Plus /></el-icon>
                <div style="margin: 2px; color: #5a6970;">add</div>
            </div>
        </div>
    </div>
</template>

<script>

//引用组件 
/*  
    # 2024/11/17
    # dreamsky
    每一个任务单元组件内部都可以动态创建更小的长方形元素，这个子组件就是小的长方形元素
*/ 
import ProgressElementDraginsideDisplay from './ProgressElementDraginsideDisplay.vue';

export default {
    data() {
        return {
            shiftX: 0,
            shiftY: 0,
            isDragging: false,
            element: null,
            intervalId: null,

            //用于控制是否显示任务
            isShowprogress:false,

            //用于接收输入框的文字信息
            progressinput: '',
            progressneme: 'Progress name',

            //用于是否显示输入框
            displayinput: false,

            //用于控制一个单元的整体高度
            elementHeight: 130,

            //用于控制inside单元格的位置
            insideelementTop: 40,

            //用于设定单元格的队列位置
            Progresscount: 0,

            //用于动态创建子组件 
            /*
                # 2024/11/17
                # dreamsky
                每当任务单元被初次创建时 都需要先提前有一个 内面板

                所以在初始化时就需要 先给一个  components:[{top: 40 ,countList: 0}],
                基础元素 其中 top: 40 就是指 动态生成的子组件 到 此组件 元素内 顶部的距离

                -————————————————- 父组件元素
                            |
                            |------------------------> 距离为40px 
                            |
                         = ------ = 子组件顶部

                也就是说 top 就是 在子组件css属性为 position: absolute;
                的基础上 给赋予的top值  
                top值会在 动态创建子组件时 传递给子组件

                <progress-element-draginside-display
                    v-for="(component, index) in components"
                    :key="index"
                    :heightLoc= "component.top"
                    :countlist = "index"
                >
                </progress-element-draginside-display>
            */ 
            components:[{top: 40 ,countList: 0}],

            
        };
    },
    components:{

        //注册组件
        ProgressElementDraginsideDisplay,

    },
    mounted() {

        this.element = this.$refs.element;

        //添加监听行为
        document.addEventListener('mouseup', this.stopDrag);
        document.addEventListener('mousemove', this.onDrag);

        //禁止元素本身默认的拖动行为
        this.element.ondragstart = () => false;
    },

    
    methods: {


        //点击字体标题事件
        /*
            # 2024/11/17
            # dreamsky

            这个就是面向对象的函数
            当用于想给这个任务单元重名名时
            点击任务单元默认的 名称 就会回调 textinputClick

            输入框就会显现且等待用户输入
        */
        textinputClick(){
            this.displayinput = !this.displayinput;
        },

        //Headerskeyup(event) 和 HeaderskeyupClick() 都是 更新任务单元名称的函数
        Headerskeyup(event){
            if(event.key == 'Enter'){
                if(this.progressinput.length > 12){
                    this.progressneme = this.progressinput.substring(0, 12) + '...';
                }else{
                    this.progressneme = this.progressinput;
                }
                this.progressinput = '';
                this.displayinput = false;
            }
        },
        HeaderskeyupClick(){
            if(this.displayinput == true && this.progressinput != ''){
                this.progressneme = this.progressinput;
                this.progressinput = '';
                this.displayinput = false;
            }
        },

        //禁用鼠标右键默认行为
        disableRightClick(event){
            //event.preventDefault();

            //用于传递给子组件生成的位置
            this.createX = event.clientX;
            this.createY = event.clientY;

            this.showProgress();
        },


        //当任务单元的范围超过了 浏览器视窗右边界或者左边界 ，如果左边界有边界还有内容 整体页面就会向左或
        //者向右移动
        movesrcollCheck(){
            //创建查找变量
            const windowWidth = window.innerWidth;
            const measurementright =  this.element.getBoundingClientRect().right;

            const measurementleft = this.element.getBoundingClientRect().left;
            //用于向父组件发送progress组件的位置状态，如果超过右窗口就向上传递toRightsrcoll状态，这样拖动条就会向右移动
            if(windowWidth <= measurementright){
                this.$emit('toRightsrcoll',true, measurementright - windowWidth);
                //this.element.style.left += '10px';
            }else if(measurementleft <= 0){
                this.$emit('toRightsrcoll',false, -1 * measurementleft);
                //this.element.style.left -= '10px';
            }

        },

        //拖动函数
        startDrag(event) {
            if(event.button == 0){

                //当被拖动时，输入框自动完成输入事件
                this.HeaderskeyupClick();

                this.handleClick();

                this.isShowprogress = false;
                event.stopPropagation();
                if (this.element) {

                    this.isDragging = true;
                    this.shiftX = event.clientX - this.element.getBoundingClientRect().left + this.containerBound;
                    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

                } else {
                    console.error('Element not found');
                }
            
                //启用轮询回调
                this.stopcallback();
                this.intervalId = setInterval(() => {
                    this.movesrcollCheck();
                }, 100)
            }   

        },
        onDrag(event) {
            if (this.isDragging && this.element) {

                //当被拖动时，调用函数
                this.callbackcommitloc();

                const movePointLeft = event.clientX - this.shiftX;
                const movePointTop = event.clientY - this.shiftY  - 67;
                

                const movePointTopadsorption  = this.adsorptionmeasureTop(movePointTop);
                const movePointLeftadsorption = this.adsorptionmeasureLeft(movePointLeft);

                this.element.style.left = `${movePointLeftadsorption}px`;
                this.element.style.top = `${movePointTopadsorption}px`;

            }
        },
        stopDrag() {
            if (this.element) {
                this.stopcallback();
                this.isDragging = false;

            } else {
                console.error('Element not found');
            }
        },

        //删除轮询回调
        stopcallback(){
            if(this.intervalId){
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        loadLoaction(movetoX,movetoY){
            console.log('用于后续数据库加载',movetoX,movetoY);
        },
        
        //吸附函数  吸附 12.5 37.5 
        adsorptionmeasureTop(adsorptionNum){
            let adsorptionMeasure =Math.floor((adsorptionNum - 12.5) / 25); //向下取整
            let rightBound = (adsorptionMeasure + 1) * 25;
            if(rightBound - adsorptionNum < 12.5 ){//距离右边界更近
                return (adsorptionMeasure + 1) * 25 -  7.5;
            }else{
                return (adsorptionMeasure) * 25 -  7.5;
            }
        },
        adsorptionmeasureLeft(adsorptionNum){
            let adsorptionMeasure =Math.floor((adsorptionNum - 12.5) / 25); //向下取整
            let rightBound = (adsorptionMeasure + 1) * 25;
            if(rightBound - adsorptionNum < 12.5 ){//距离右边界更近
                return (adsorptionMeasure + 1) * 25 -  7.5;
            }else{
                return (adsorptionMeasure) * 25 -  7.5;
            }
        },

        //菜单
        showProgress(){
            this.isShowprogress = !this.isShowprogress;
        },

        //显示输入状态
        inputfocus(){
            this.$nextTick(()=>{
                    this.$refs.inputref.focus();
            });
        },
        handleClick(){
            this.$emit('bring-to-front'); // 自定义事件 
        },

        //添加按钮
        addbotton(){
            this.elementHeight += 55;
            this.insideelementTop += 55;
            this.Progresscount += 1;
            this.components.push(
                {top:this.insideelementTop ,countList:this.Progresscount}
            );
            console.log('components:',this.components);

        },

        //用于删除inside单元格 待修复BUg
        deletProgress(){

            
            if(this.components.length){
                this.elementHeight -= 55;      
                this.insideelementTop -= 55;
            }else{

                //向组件抛出事件
                this.$emit('deletchiropractic',this.index);
            }

            this.components.pop();
            
        },

        //当点击Link按钮之后,就会向父组件传递该组件的位置以及index索引
        LinkProgress(){ 

            //向父组件传输自身索引告知父组件自己想要被link
            this.$emit('wantBelink',this.index);

        },

        //当此组件被拖动时就会调用该函数
        callbackcommitloc(){
            /*  
                # 2024/11/17
                # dreamsky
                创建一个数组 ---->
                第一个元素 包含着 生成时此子组件的索引 
                第二个元素 包含着 此时子组件的 left位置
                第三个元素 包含着 此时子组件的 top位置
            */ 
            const locbemove = [this.index,parseInt(this.element.style.left,10),parseInt(this.element.style.top,10)];
            
            //向父组件传递locbemove数组
            this.$emit('bemove',locbemove);
        }


    },
    props: {

        //接收当前 容器（也就任务单元组件所附着的大背景板 最右侧）到 用户浏览器窗口 最右侧的距离 px
        containerBound: Number,

        //未定义 之后有用
        zindex: Number,

        //在初始化一个新的任务单元对象时 父组件向 此传递的该组件的数组索引  也就是 用于删除此组件的数组索引index 
        index:Number,

        //接收一个left初始化值
        elementleft:Number,

        //接受一个top初始化的值
        elementtop:Number
    },
    watch: {
        containerBound(newVal) {
            console.log("containerBoundVal -> ", newVal);
        },
        displayinput(newVal){
            if(newVal){
                this.$nextTick(()=>{
                    this.$refs.inputref.focus();
                });
            }
        }
    }
}
</script>
 
<style scoped>

#element {
    
    width: 190px;
    
    /* 20中心距离 */
    background-color: #f3f3f3;
    outline: 1px solid #777777;
    /* outline: 2px solid #40A578; */
    border-radius: 5px;
    display: flexbox;
    position: absolute;
}
#inputborad{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    border: 1px solid #ccc; /* 自定义边框样式 */
    position: absolute;
    height: 23px;
    left: 6px;
    right: 40px;
    top: 5px;
    border-radius: 5px;

}

input,
input:focus,
input:active,
input:hover {
  outline: none;
  border: 1px solid #919191; /* 自定义边框样式 */
  box-shadow: none;
}

#Dragelement{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
#text{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: absolute;
    top: -12px;
    left: 10px;
    color: #5a6970;

}
#insideBackgrand{
    width: 175px;
    height: 55px;
    background-color: #f8f8f8;
    outline: 1px solid #a4a4a4;
    position: absolute;
    top: 40px;
    right: 7.5px;
    border-radius: 4px;
    display: flex;
    box-shadow: 0px 1px 1px rgba(217, 220, 220, 0.842);
}
#bottomelement{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    position: absolute;
    left: 5px;
    right: 180px;
    bottom: 5px;
    height: 25px;
    display: flex;
}
#addbotton{
    width: 65px;
    height: 24px;
    margin: 1px;
    background-color: #f3f3f3;

    border-radius: 5px;
    display: flex;
}
#addbotton:hover{
    background-color: #dcdcdc;

}
#addbotton:active{
    background-color: #b6b6b6;

}
#iconP{
    margin: 4px;
}
#deletinsideelement{
    position: absolute;
    right: 0;
    top: 0;
    margin: 12px;
    opacity: 40%;
}
#extend{
    position: absolute;
    width: 20px;
    height: 20px;
    right: 7px;
    bottom: 7px;
    background-color: #89e860;
    outline: 1px solid #a4a4a4;

    border-radius: 20px;
}
#insideProgress1{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    position: absolute;
    bottom: 5px;
    right: 8px;
    width: 110px;
}
</style>
