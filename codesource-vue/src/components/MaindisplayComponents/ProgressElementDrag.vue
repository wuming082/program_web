<template>
    <div id="container">    
        <div id="Progress" @mousedown="startDrags"></div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        };
    },
    mounted(){
        
        //获取容器DOM元素
        //this.container = document.getElementById(container);

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
}
#container{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>