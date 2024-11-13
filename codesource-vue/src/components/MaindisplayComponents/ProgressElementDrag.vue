<template>
    <div id="container">    
        <!-- <div id="Progress" @mousedown="startDrags"></div> -->
        
    </div>
</template>

<script>
import ProgressDrag from './ComponentsClass/ProgressDrag.js';

export default{
    data(){
        return{
            
        };
    },
    mounted(){
        //获取容器DOM元素
        //this.container = document.getElementById(container);
        const MyObject = new ProgressDrag("container");
        console.log(MyObject);
    },
    methods:{

    }
}
</script>

<style scoped>
#Progress{
    background-color: #41C9E2;
    width: 100px;
    height: 40px;
    margin: 30px;
    border-radius: 5px;
    outline: 2px solid #5d5d5d; /* 环绕线 */
}
#container{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>