<template>
    <div id="element" @mousedown.stop="startDrag"></div>
</template>

<script>

export default{
    data(){
        return{

        };
    },
    mounted(){
        this.element = document.getElementById('element');
    },
    methods:{
        startDrag(){
            
        }
    }
}
</script>

<style scoped>
#element{
    margin: 10px;
    width: 100px;
    height: 40px;
    background-color: #E6FF94;
    outline: 2px solid #40A578;
    border-radius: 10px;
}
</style>