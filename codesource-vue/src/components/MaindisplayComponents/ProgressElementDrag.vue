<template>
    <div ref="element" :style="{ height: elementHeight + 'px' }" id="element">
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
        <el-icon 
            id="deletinsideelement" 
            :size="15" 
            @click="deletProgress"
            ><Delete />
        </el-icon>
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

            components:[{top: 40 ,countList: 0}],

            
        };
    },
    components:{
        ProgressElementDraginsideDisplay,

    },
    mounted() {
        this.element = this.$refs.element;
        document.addEventListener('mouseup', this.stopDrag);
        document.addEventListener('mousemove', this.onDrag);

        this.element.ondragstart = () => false;
 

        //禁用默认的右键
        //this.element.addEventListener('contextmenu', this.disableRightClick);


    },

    
    methods: {
        //点击字体标题事件
        textinputClick(){
            this.displayinput = !this.displayinput;
        },
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
        startDrag(event) {
            if(event.button == 0){

                //当被拖动时，输入框自动完成输入事件
                this.HeaderskeyupClick()


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
            
        }


    },
    props: {
        containerBound: Number,
        progressextent: String,
        zindex: Number,
        index:Number,
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
