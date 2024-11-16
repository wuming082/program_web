<template>
  <div class="common-layout">
    <el-container>
      <el-header :style="headStyle">
        
        <el-button type="primary" style="margin: 20px;" @click="drawer = true">Primary</el-button>
      </el-header>
      <el-container>
        <el-main :style="mainStyle">
          <main-display></main-display>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer v-model="drawer" direction="ltr" title="任务调取框架" :with-header="false" modal="false">
      <progress-line/>
    </el-drawer>
  </div>
</template>

<script>

//导入组件
import ProgressLine from './components/ProgressLine.vue';
import mainDisplay from './components/mainDisplay.vue';

export default {
  name: 'App',
  components: {

    //注册组件
    mainDisplay,
    ProgressLine,
  },
  data() {
    return {

      //控制左侧抽屉组件
      drawer: false,
      asideDisplayBool: false,

      headStyle: {
        gap: '10px', /* 子元素之间的间距 */
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(248, 248, 248)',
        left: '0px',
        right: '0px',
        top: '0px',
        height: '67px',
        borderBottom: '0.4px solid #c8c8c8',/* 黑色的2像素描边 */
        position: 'fixed'
      },
      mainStyle: {
        backgroundColor: 'rgb(255, 255, 255)',
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        left: '0px',
        top: '10%'
      }
    };
  },
  methods:{
    asideDisplay(){
      if(this.asideDisplayBool){
        this.asideStyle.left = '0%';
        this.asideDisplayBool = !this.asideDisplayBool;
      }else{
        this.asideStyle.left = '-20%';
        this.asideDisplayBool = !this.asideDisplayBool;
      }
    }
  }
}
</script>

<style>
  
  </style>
