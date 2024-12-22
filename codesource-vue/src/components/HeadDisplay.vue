<template>
    <div id="Head">
        <div id="projectName">
            <h1>project name</h1>
        </div>
        <Botton-list id="bottonlist"></Botton-list>
        <show-time></show-time>
        <!-- 用于最顶上的进度条 -->
        <progress-bar-main id="progress" :stroke-width="80" :Linelong="inlong" style="position: absolute; right: 325px; left: 700px; top:5px;"></progress-bar-main>
       
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
#progress{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

}
#projectName{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    position: absolute;
    top: -13px;
    left: 420px;
    color: #5e5e5e;

}
</style>