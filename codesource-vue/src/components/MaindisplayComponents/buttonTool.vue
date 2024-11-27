<template>
    <div id="tool">
        <!-- <div id="head" ></div> -->
         <!--测试按钮--->
         <el-button  id="buttonCreate" type="success" color="#7B92EE" @click="CreateElement">
            <h3 style="color: #F5EFF5;">create</h3>
            <el-icon size="20" style="margin: 10px;"><FolderAdd /></el-icon>
         </el-button>
        
    </div>
</template>

<script>
export default{
    data(){
        return{

        };
    },
    methods:{
        CreateElement(){
            this.$emit('create');
        },
    }
}
</script>

<style scoped>
#tool{
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 190px;
    outline: 3px solid #b0b0b0;
    
    background-color: #f7f7f7;
    /* border-radius: 50%; */
    height: 80px;
    border-radius: 10px;
}
#head{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 20px;
    background-color: #0288D1;
}
#buttonCreate{
    height: 50px;
    width: 120px;
    border-radius: 5px;
    position: absolute;
    left: 15px;
    top: 15px;

}

</style>