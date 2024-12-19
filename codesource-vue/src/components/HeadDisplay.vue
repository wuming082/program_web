<template>
    <div id="Head">
        <Botton-list id="bottonlist"></Botton-list>
        <show-time></show-time>
        <!-- 用于最顶上的进度条 -->
        <progress-bar-main :stroke-width="80" :Linelong="inlong" style="position: absolute; right: 310px; left: 315px; top: -10px;"></progress-bar-main>
    </div>
</template>

<script>
import BottonList from './HeaddisplayComponents/BottonList.vue';
import ShowTime from './HeaddisplayComponents/ShowTime.vue';
import ProgressBarMain from './ProgressBarMain.vue';

export default{


    data(){
        return{

        }
    },
    components:{
        BottonList,
        ShowTime,
        ProgressBarMain,
    },
    props:{
        inlong:Number
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