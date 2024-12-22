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

        <div ref="ctrlmessage" id="alertmessage">
            <h4 style="position: absolute; color: azure;  left: 6px; top: -23px;">new</h4>
        </div>
        <!-- 用于删除自身内部inside组件和删除自身的按钮 Test-->
        <el-icon 
            id="deletinsideelement" 
            :size="22" 
            @click="showoptionpage"
            ><Edit />
        </el-icon>
        
        <!-- 设置按钮 -->

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
        <!-- <el-date-picker
            width="10px"
            v-model="value"
            type="date"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
        /> -->
        
        <div ref="optionctrl" id="optionpage">
            <el-date-picker
                style="left: 10px; top: 10px;"
                v-model="value1"
                type="date"
                placeholder="Pick a Date"
                format="YYYY/MM/DD"
            />
            <el-date-picker
                style="left: 10px; top: 15px;"
                v-model="value2"
                type="date"
                placeholder="Pick a Date"
                format="YYYY/MM/DD"
            />
            <!-- 删除按钮 -->
            <el-button  @click="deletProgress" type="danger" plain style=" position: absolute; bottom: 0px; left: 0px; height: 35px; width: 80px; margin: 10px; border-radius: 5px;">
                <h4>删除</h4>
                <el-icon size="15" style="right: -3px; top: -2px;"><Delete /></el-icon>
            </el-button>
            <el-button  :disabled="istruetime" @click="createline" type="Primary" plain style=" position: absolute; bottom: 41px; left: 225px; height: 70px; width: 40px; margin: 10px; border-radius: 5px;">
                <el-icon size="20" style="right: 0px; top: -2px;"><Finished /></el-icon>
            </el-button>
        </div>
        <div ref="contentoverctrl" id="contentover" :style="{width :contentlong + 'px'}">
            <h5 v-if="israngetime" style="color: azure; position: absolute; left: 10px; top: -13px;">{{ value1_str }}</h5>
            <h5 v-if="israngetime" style="color: azure; position: absolute; right: 10px; top: -13px;">{{ value2_str }}</h5>
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

//调用element-plus组件
import { ElNotification , ElMessageBox } from 'element-plus'

export default {
    data() {
        return {
            value1: null,
            value2: null,

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

            //用于控制optionpage是否打开
            optionpagedispaly: false,

            //是否可以点击点击生成line按钮
            istruetime: true,

            //时间线长度
            contentlong: 35,

            //是否被分配时间线
            israngetime: false,

            //用于展示时间的字符串
            value1_str: '',
            value2_str: '',

            //是否已知起始时间节点starttime
            isreceptionstarttime:false,
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

        //初始化位置
        this.element.style.left = this.elementleft  + 'px';
        this.element.style.top = this.elementtop + 'px';
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
                if(this.optionpagedispaly){
                    this.showoptionpage();
                }
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
        },

        //用于打开设置页面菜单栏
        showoptionpage(){
            this.optionpagedispaly = !this.optionpagedispaly;
            if(this.optionpagedispaly){
                //显示设置页面
                this.$refs.optionctrl.style.display = 'block';
                this.$refs.optionctrl.style.left = 200 + 'px' ;
            }else{
                this.$refs.optionctrl.style.display = 'none';
                this.$refs.optionctrl.style.left = 0 + 'px' ;
            }
            // console.log("data" + this.value1);
        },


        //验证value1/value2的合法性
        //value1一定要小于 value2因为value1为任务单元的起始时间
        checkvalue()
        {   
            if(this.value1 != 0 &&  this.value2 != 0){
                if(this.value1 > this.value2){
                    //错误值
                    this.istruetime = true;
                    ElNotification({
                      title: '时间设定错误',
                      message: '起始时间大于终止时间',
                      type: 'warning',
                      // position: 'bottom-left',
                    })
                }else{
                    this.istruetime = false;
                }
            }
        },

        //生成时间线
        //2024/12/22 
        /*
            dreamsky
            异步处理函数
            因为ElMessageBox采用异步处理函数，所以使用异步函数来搭配
            需要用的await关键字来进行异步函数进行等待

            为何要用到ElMessageBox组件
            是因为如果任务单元的时间如果生成后超过了，maindispaly宽度的最大值
            所以需要用ElMessageBox组件来进行警告，生成的时间线超过了最大宽度，
            询问是否要增加maindisplay画布的宽度
        */
        async createline(){

            //计算该任务单元的起始时间与整体任务的起始时间的时间差（天数）
            const timeGap = (this.value1 - this.starttime) / 86400000;//求相差的天数

            //先将value1和value2的字符串进行赋值，可以显示任务单元的时间线上的起始结束时间
            this.value1_str = this.dateInit(this.value1);
            this.value2_str = this.dateInit(this.value2);
            
            //计算移动到目标的地点
            const destination =  70 + timeGap * 200;

            //debug
            // console.log("this.value1.getMonth->",this.value1.getMonth);

            //计算value1和value2相差多少天
            //86400000为一天的时间
            //根据daytime数字来创建长度
            const daytime =  ((this.value2 - this.value1) / 86400000 );
            
            //设定一天的长度 //!!不容易修改，后期修复//
            const daylong = 190;

            //补足多余的长度
            let ismove = 0;
            if(daytime != 1){
                ismove = 10;
            }

            //计算时间线的宽度的值
            const measurelong = daylong * daytime + ismove * daytime;

            //使用await等待iscansetinboard函数返回的结果如果
            if(!await this.iscansetinboard(measurelong,destination)){
                return 0;
            }

            //如果时间长度为0 ，则没必要显示时间线
            if(daytime != 0){
                this.$refs.contentoverctrl.style.display = "block";
            }

            //等待100ms后开始创建时间线设定contentoverctrl元素的长度
            //并告知israngetime改成true 说明时间线已经被分配
            setTimeout(() => {
                this.$refs.contentoverctrl.style.transition = 100 * daytime + 'ms';
                this.israngetime = true;

                //给长度赋值
                this.contentlong = measurelong;
            }, 100);

            //如果菜单窗口还是开启的状态，在生成时间线后就关闭窗口
            if(this.optionpagedispaly){
                this.showoptionpage();
            }
            this.$refs.ctrlmessage.style.display = 'none';

            //等带100ms后将任务单元移动到目标地点
            setTimeout(() => {
                //将任务单元移动目标地点点
                this.element.style.left = destination + 'px';
                console.log("this.element.style.left->",this.element.style.left);
            }, 100);
            
        },

        //验证时间线合法性
        /*  
            2024/12/22
            dreamsky

            接收变量 linesize（时间线的长度）destination（到达目的地后，任务单元左侧到画布左侧的距离）
            判断 linesize + destination + 任务单元本身的长度 的宽度是否大于画布的宽度

            使用异步处理函数在进行ElMessageBox组件展示时
            用await等待反馈的结果
            如果linesize数值超过了画布宽度最大值，就询问是否确定创建时间线
            //并且自动增加画布宽度//
            如果用户选择不增加画面，则iscansetinboard函数直接返回false

            如果linesize的长度没有超过画布最大值，则直接返回true
        */
        async iscansetinboard(linesize,destination){

            //计算该计算单元到画布左侧边框的距离leftdistand
            const leftdistand = destination;
            // console.log("leftdistand",leftdistand);

            //判断该任务单元生成时间线后是否长度超过画布
            if((leftdistand + 250 + linesize ) > this.boardwigth){
                //向上申请扩充空间 （leftdistand + 250 + linesize） - this.boardwigth
                //询问用户是否想要申请空间
                try {
                    await ElMessageBox.confirm(
                        '即将创建的时间长度大于页面宽度，是否自动适配？',
                        '宽度警告',
                        {
                          confirmButtonText: 'OK',
                          cancelButtonText: 'Cancel',
                          type: 'warning',
                        }
                    );
                    //如果用户选择了OK同意则程序继续进行
                    const expendNumber = (leftdistand + 250 + linesize) - this.boardwigth;
                    this.$emit('expendboard',expendNumber + 100);

                    //告知上层函数可以生成时间线
                    return true;

                    
                }   catch(err){
                    //如果用户选择了cancel则报错被catch捕获 并返回false
                    //告知不能生成时间线
                    return false;

                }
            }else{

                //如果生成后的时间并没有超过画布则直接返回true表示可以生成时间线
                return true;
            }
        },

        //格式化日期函数
        /*
            2024/12/22
            dreamsky
            格式化时间函数传入一个date时间对象
            分别转换成day，Monthdata ，Year
            然后合并返回字符串 YYYY/MM/DD
        */
        dateInit(timedate){
            let day = timedate.getDate();
            let Monthdata = ( timedate.getMonth() + 1);
            let Year = timedate.getFullYear().toString();
            return `${Year}/${Monthdata}/${day}`;
        },


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
        elementtop:Number,

        //接收目前背景的宽度
        boardwigth:Number,

        //接受起始时间
        starttime:Object,
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
        },
        value1(){
            this.checkvalue();
        },
        value2(){
            this.checkvalue();
        },
        //接收boardwigth最新的watch函数
        boardwigth(){

        },
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
    right: -2px;
    top: -2px;
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
#optionpage{
    position: absolute;
    top: 0px;
    height: 130px;
    left:0px;
    width: 285px;
    background-color: #f0f0f0;
    z-index: -1;
    /* transition: 100ms; */
    outline: 1px solid #a4a4a4;
    border-radius: 5px;
    display: none;
}
#deleltButton{
    background-color: #F35F5F;
    width: 80px;
    height: 35px;
    position: absolute;
    border-radius: 5px;
    bottom: 8px;
    left: 10px;
    outline: 1px solid #e3e3e3;

}
#contentover{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    position: absolute;
    top: 0px;
    width: 40px;
    left: 198px;
    height: 35px;
    background-color: rgb(143, 219, 219);
    outline: 1px solid rgb(96, 145, 145);
    border-radius: 5px;
    z-index: -2;
    transition: 100ms;
    display: none;
  }
#alertmessage{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: absolute;
    width: 45px;
    height: 20px;
    border-radius: 5px;
    background-color: #fa403d;
    left: -10px;
    top: -10px;
    opacity: 90%;
}

</style>
