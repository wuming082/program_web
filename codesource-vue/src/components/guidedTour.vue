<template>
    <div>
        <div id="background" :style="{ bottom: locationGuide + 'px', display: displayTrans , opacity: opacityBool + '%' , transition: transtime + 'ms'}">
            <div id="topgress">
                <div id="elementPoint" :style="{left: elementLoc + '%',}"></div>
            </div>
            <el-progress id="Mainprogress" text-inside="true" stroke-width="22" :color="guide" :percentage="Linelong" />
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

        };
    },
    props:{
        Linelong:Number,
        displayBool:Boolean,
        loacdisplay: Number,
        elementLoc: Number
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
    z-index: 2;
    position: absolute;
    left: 50%; /* 元素左边距父元素左边缘50% */
    transform: translateX(-50%); /* 元素向左移动自身宽度的一半 */
    border-radius: 25px;
    width: 300px;
    height: 70px;
    background-color: rgba(169, 212, 52, 0.992);
    box-shadow: 0px 10px 20px rgba(149, 151, 151, 0.842);
    outline: 1px solid #31511E; /* 环绕线 */
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
    right: 29px;
    background-color: #eef6de;
    border-radius: 5px;
    outline: 1px solid rgba(255, 254, 245, 0.711); /* 环绕线 */
}
#elementPoint{
    position: absolute;
    top: 0;
    bottom: 0;

    width: 30px;
    background-color: #fffdf4;
    border-radius: 5px;
    outline: 2px solid rgba(66, 66, 66, 0.711); /* 环绕线 */
    transform: translate(-70%, 0%);
}
</style>

