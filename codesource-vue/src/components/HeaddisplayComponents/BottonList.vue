<template>
    <div>
        <div id="backgrand">
            <el-button id="person" size="large"  />
            <el-button id="message" color="#F09319" type="success" plain>Success</el-button>
            <el-button id="avater">pic</el-button>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    methods(){

    }
}
</script>

<style scoped>
#avater{
    position: absolute;
    top: 4px;
    right: 6px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
}
#backgrand{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 300px;
    background-color: rgb(232, 232, 232);
    border-radius: 12px;
    outline: 2px solid rgba(194, 194, 194, 0.711); /* 环绕线 */
}
#person{
    position: absolute;
    top:4px;
    left:7px;
    border-radius: 10px;
}
#message{
    position: absolute;
    top: 4px;
    left: 40px;
    width: 136px;
    height: 40px;
    border-radius: 10px;
}
</style>