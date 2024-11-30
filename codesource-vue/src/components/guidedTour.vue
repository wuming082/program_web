<template>
    <div>
        <div id="background" :style="{ bottom: locationGuide + 'px', display: displayTrans , opacity: opacityBool + '%' , transition: transtime + 'ms'}">
            <div id="topgress">
                <div id="elementPoint" :style="{left: elementLoc * 210 + 'px' , width: moveelement + 'px'}"></div>
            </div>
            <el-icon size="20" style=" position: absolute; right: 30px; top: 8px; opacity: 60%;"><MapLocation /></el-icon>
            <el-progress id="Mainprogress"  text-inside="true" stroke-width="22" color= #959595 :percentage="Linelong" />
            <!-- <img src="../assets/PngItem_4262019.png" id="Tree" alt="tree"> -->

        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            guide: '#' + '859F3D',

            locationGuide: 0,
            displayTrans: 'none',
            opacityBool: 0,

            //延迟变量
            transtime: 300,

            //整个顶部导览条的长度为210px

            moveelement:0,

        };
    },
    props:{
        Linelong:Number,
        displayBool:Boolean,
        loacdisplay: Number,
        elementLoc: Number,

        //记录整体页面的长度
        pagemainsure: Number,
    },
    mounted(){
        let windowWidth = window.innerWidth;
        this.moveelement = windowWidth  *  210 / this.pagemainsure;
    },
    methods:{
        transforDisplay(){
            this.displayTrans = 'block';  
            setTimeout(() => {
                this.opacityBool = 100;
                this.locationGuide = 40;
            }, this.transtime);
        },
        transforEnDisplay(){
            this.locationGuide = 30;
            this.opacityBool = 0;
            setTimeout(() => {
                this.displayTrans = 'none';
            }, this.transtime);
        }
    },
    watch:{
        pagemainsure(newVal){
            let windowWidth = window.innerWidth;
            this.moveelement = windowWidth  *  210 / newVal;
        },
        displayBool(newVal){
            if(newVal){
                this.transforDisplay();
            }else{
                this.transforEnDisplay();
            }
        },
    },
}
</script>

<style scoped>
#background{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    z-index: 2;
    position: absolute;
    left: 50%; /* 元素左边距父元素左边缘50% */
    transform: translateX(-50%); /* 元素向左移动自身宽度的一半 */
    border-radius: 20px;
    width: 300px;
    height: 70px;
    background-color: #f8f8f8;
    box-shadow: 0px 10px 20px rgba(149, 151, 151, 0.842);
    outline: 2px solid #b6b6b6; /* 环绕线 */
}

#Mainprogress{
    position: absolute; /* 绝对定位 */
    bottom: 10px;
    left: 20px;
    right: 20px;
}
#topgress{
    position: absolute; /* 绝对定位 */
    height: 15px;
    bottom: 43px;
    left: 29px;
    width: 210px;
    background-color: #dcdfdf;
    border-radius: 5px;
    outline: 1px solid rgba(255, 254, 245, 0.711); /* 环绕线 */
}
#elementPoint{
    position: absolute;
    top: 0;
    bottom: 0;

    width: 30px;
    background-color: #f4f4f4;
    border-radius: 5px;
    outline: 1px solid rgba(66, 66, 66, 0.711); /* 环绕线 */
    transform: translate(0%, 0%);
}
#Tree{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    bottom: 0;
    top: -20px;
    right: 10px;
    opacity: 80%;
    transform: matrix3d(20);
}
</style>

