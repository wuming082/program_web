<template>
    <div id="ProgressShow" :style="{left: 'this.createLocX' + px , top: 'this.createLocY' + px}">

    </div>
</template>

<script>
export default{
    data(){
        return{
            
        };
    },
    props:{
        createLocX:Number,
        createLocY:Number
    }
}
</script>

<style scoped>
#ProgressShow{
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: #131314;
    border-radius: 18px;
}
</style>