<template>
    <div id="tool">
        <el-button  @click="addpage" type="info" plain style=" position: absolute; height: 85px; width: 80px; margin: 10px; border-radius: 10px;">
            <h1>Add</h1>
            <el-icon size="20"><DocumentAdd /></el-icon>
        </el-button>
        <el-button  @click="Shedpage" type="danger" plain style=" position: absolute; top: 95px; height: 85px; width: 80px; margin: 10px; border-radius: 10px;">
            <h1>Shed</h1>
            <el-icon size="20"><DocumentRemove /></el-icon>
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
        addpage(){
            this.$emit('addpage');
        },
        Shedpage(){
            this.$emit('Shedpage');
        }
    }
}
</script>

<style scoped>
#tool{
    position: absolute;
    display: flex;
    top: 50%;
    right: 0;
    height: 200px;
    width: 100px;
    border-top-left-radius: 20px; /* 控制左上角圆角半径 */ 
    outline: 2px solid #a4a4a4;
    border-bottom-left-radius: 20px; /* 控制左下角圆角半径 */
    background-color: rgb(244, 244, 244);
    transform: translate(0%, -50%); /* 使元素自身移动负50%以垂直和水平居中 */
}
</style>