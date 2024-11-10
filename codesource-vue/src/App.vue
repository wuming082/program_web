<template>
  <div>
    <section class="leftList">
      <progress-line/>
    </section>
    <section class="topList">
      <progress-bar/>
      <info-message/>
    </section>
    <section class="display">
      <hello-world id="loc" msg="Welcome to dreamsky web"></hello-world>
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ProgressBar from './components/ProgressBar.vue';
import InfoMessage from './components/InfoMessage.vue';
import ProgressLine from './components/ProgressLine.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    ProgressBar,
    InfoMessage,
    ProgressLine
  }
}
</script>

<style>
    section.topList{
      background-color: rgb(248, 248, 248);
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      height: 10%;
      border-bottom: 0.4px solid #c8c8c8; /* 黑色的2像素描边 */
    }
    
    section.leftList{
      background-color: rgb(249, 249, 249);
      position: absolute;
      left: 0px;
      top: 0px;
      bottom: 0px;
      width: 20%;
      border-right: 0.4px solid #c8c8c8; /* 黑色的2像素描边 */
    }
    
    section.display{
      z-index: -1;
      background-color: rgb(255, 255, 255);
      position: absolute;
      bottom: 0px;
      right: 0px;
      left: 20%;
      top: 10%;
    }
    #loc{
      position: absolute;
      top: 250px;
      left: 400px;
    }
  </style>
