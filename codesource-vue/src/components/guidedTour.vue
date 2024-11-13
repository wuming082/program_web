<template>
    <div>
        <div id="background" :style="{ bottom: locationGuide + 'px', display: displayTrans , opacity: opacityBool + '%' , transition: transtime + 'ms'}">
            <el-progress id="progress" text-inside="true" stroke-width="22" :color="guide" :percentage="Linelong" />
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
        }
    },
}
</script>

<style scoped>
#background{
    position: absolute;
    left: 50%; /* 元素左边距父元素左边缘50% */
    transform: translateX(-50%); /* 元素向左移动自身宽度的一半 */
    border-radius: 25px;
    width: 300px;
    height: 60px;
    background-color: rgba(169, 212, 52, 0.992);
    box-shadow: 0px 10px 20px rgba(149, 151, 151, 0.842);
    outline: 3px solid rgba(254, 252, 223, 0.918); /* 环绕线 */
}

#progress{
    position: absolute; /* 绝对定位 */
    bottom: 10px;
    left: 20px;
    right: 20px;
}
</style>

