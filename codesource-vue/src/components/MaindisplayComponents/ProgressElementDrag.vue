<template>
    <div ref="element" :style="{ height: elementHeight + 'px' }" id="element">
        <div id="Dragelement" @mousedown="startDrag"></div>
        <h1 id="text" v-if="!displayinput" @click="textinputClick">{{progressneme}}</h1>
        <input v-if="displayinput"
            ref="inputref" id="inputborad"
            @keyup="Headerskeyup" 
            @click="inputfocus"
            v-model="progressinput" 
            placeholder= 'please input name'
        >
        <progress-element-draginside-display
            v-for="(component, index) in components"
            :key="index"
            :heightLoc= "component.top"
            :index="index"
        ></progress-element-draginside-display>
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
            insideelementTop: 40,

            components:[{top: 40 }],

            
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
 
        this.element.addEventListener('contextmenu', this.disableRightClick);


    },
    beforeUnmount(){
        this.element.removeEventListener('contextmenu', this.disableRightClick);
    },

    
    methods: {
        //点击字体标题事件
        textinputClick(){
            this.displayinput = !this.displayinput;
        },
        Headerskeyup(event){
            if(event.key == 'Enter'){
                this.progressneme = this.progressinput;
                this.progressinput = '';
                this.displayinput = false;
            }
        },

        //禁用鼠标右键默认行为
        disableRightClick(event){
            event.preventDefault();

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
            this.components.push(
                {top:this.insideelementTop }
            );
        },


    },
    props: {
        containerBound: Number,
        progressextent: String,
        zindex: Number,
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
#extend{
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 3px;
    right: 10px;
    top: 13px;
    background-color: rgb(141, 226, 66);
    outline: 2px solid #628453;
}

#Dragelement{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 34px;
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
    right: 5px;
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
</style>
