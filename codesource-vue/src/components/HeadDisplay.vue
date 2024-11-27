<template>
    <div id="Head">
        <Botton-list id="bottonlist"></Botton-list>
        <show-time></show-time>
    </div>
</template>

<script>
import BottonList from './HeaddisplayComponents/BottonList.vue';
import ShowTime from './HeaddisplayComponents/ShowTime.vue';

export default{


    data(){
        return{

        }
    },
    components:{
        BottonList,
        ShowTime,
    }
}
</script>

<style scoped>
#Head{
    position: absolute;
    bottom: 9px;
    left: 5px;
    right: 5px;
    top: 9px;
    display: flex;
    
}
#bottonlist{
    position: absolute;
    right: 305px;
    height: 48px;
}
</style>