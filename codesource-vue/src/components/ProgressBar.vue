<template>
    <div id="sample">
        <!-- <buttonGroup>
            <el-button @click="increase"/>
        </buttonGroup> -->
        <el-progress
            :percentage="percentage"
            :stroke-width="15"
            striped
            striped-flow
            duration = 10
            color="rgb(29, 197, 197)"
        />
    </div>
</template>
<style scoped>
#sample{
    width: 300px;
    margin: 20px;
    right: -10px;
}

</style>
  <script>
  //import { Minus, Plus } from '@element-plus/icons-vue';
  export default {
    data() {
      return {
        percentage: 70,
      };
    },
    computed: {
      duration() {
        return Math.floor(this.percentage / 10);
      },
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 0;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      },
    },
  
  };
  
  </script>
  <style scoped>
  .demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
  }
  </style>