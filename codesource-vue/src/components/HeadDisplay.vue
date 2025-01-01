<template>
    <div id="Head">
        <show-time></show-time>
        <el-button id="projectName">
            project name
        </el-button>
        <el-button id="pieChartButton">
            <el-progress
                type="circle"
                :percentage="inlong"
                :stroke-width="10"
                :width="50"
                :color="customColors"
            />
        </el-button>
        <!-- <Botton-list id="bottonlist"></Botton-list>，注释掉了原先的按钮列表 -->
        <UserAvatar id="useravatar"></UserAvatar>
        <PageMenu id="pagemenu"></PageMenu>
        <!-- 临时隐藏了原有的进度条 -->
        <progress-bar-main v-if="false" id="progress" :stroke-width="80" :Linelong="inlong"></progress-bar-main>
    </div>
</template>

<script>
// import BottonList from './HeaddisplayComponents/BottonList.vue';
import ShowTime from './HeaddisplayComponents/ShowTime.vue';
// import ProgressBarMain from './ProgressBarMain.vue';
import PageMenu from './HeaddisplayComponents/PageMenu.vue';
import UserAvatar from './HeaddisplayComponents/UserAvatar.vue';


export default{
    data(){
        return{
            // 自定义颜色，可以根据进度值动态设置
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 },
            ],
        }
    },
    components:{
    // BottonList,
    ShowTime,
    // ProgressBarMain,
    PageMenu,
    UserAvatar,
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

/* 饼状图样式 */
#progress {
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: absolute;
    top: 50%; 
    padding: 0%;
    margin: 0%;
    transform: translateY(-50%); 
}

/* 饼状图按钮样式 */
#pieChartButton {
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */
    -moz-user-select: none; /* 适用于火狐浏览器 */
    -ms-user-select: none; /* 适用于Internet Explorer/Edge */
    user-select: none; /* 适用于支持CSS3的浏览器 */
    position: fixed; 
    top: 0px;
    left: calc(64.2%); /* 紧挨着 projectName 右侧 */
    text-align: center; 
    height: 62px;
    width: 62px;
    margin-bottom: 3px;
    z-index: 1000; 
    /* 按钮样式 */
    color: #484848; 

    cursor: pointer; /* 鼠标悬停时显示手型 */

    /* 使按钮完全不可见 */
    background-color: transparent; /* 背景透明 */
    border: none; /* 移除边框 */
    box-shadow: none; /* 移除阴影 */
    outline: none; /* 移除点击时的轮廓 */
    transition: transform 0.1s ease, box-shadow 0.1s ease;
}

#pieChartButton:hover {
    transform: translateY(2px); /* 悬浮时略微下凹 */
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 悬浮时添加阴影 */
}

#pieChartButton:active {
    transform: translateY(4px); /* 点击时进一步下凹 */
    color: #303030; /* 点击时颜色加深 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 点击时阴影变小 */
}


#projectName{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: fixed; /* 固定在页面上 */
    top: 0px; 
    left: 50%; /* 水平居中 */
    transform: translateX(-50%); /* 通过偏移实现精确居中 */
    text-align: center; /* 文本居中 */
    width: 30%; /* 宽度根据内容自适应 */
    height: 62px;
    margin-bottom: 3px;
    z-index: 1000; /* 确保元素在最上层 */

    /* 按钮样式 */
    padding: 10px 20px; /* 内边距 */
    color: #484848; /* 文字颜色 */
    font-size: 30px; /* 字体大小 */
    font-weight: bold; /* 字体加粗 */

    cursor: pointer; /* 鼠标悬停时显示手型 */

    /* 使按钮完全不可见 */
    background-color: transparent; /* 背景透明 */
    border: none; /* 移除边框 */
    box-shadow: none; /* 移除阴影 */
    outline: none; /* 移除点击时的轮廓 */
    transition: transform 0.1s ease, box-shadow 0.1s ease; /*缓动效果*/
}

#projectName:hover {
    transform: translateX(-50%) translateY(2px); /* 悬浮时略微下凹 */
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 悬浮时添加阴影 */
}

#projectName:active {
    transform: translateX(-50%) translateY(4px); /* 点击时进一步下凹 */
    color: #303030; /* 点击时颜色加深 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 点击时阴影变小 */
}

#pagemenu{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: fixed; /* 固定在页面上 */
    top: 0px; /* 距离顶部距离 */
    right: 0px; /* 距离右侧距离 */
    z-index: 1000; /* 确保元素在最上层 */
}

#useravatar{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    position: fixed; /* 固定在页面上 */
    top: 0px; /* 距离顶部距离 */
    right: 80px; /* 距离右侧距离 */
    z-index: 1000; /* 确保元素在最上层 */
}

</style>