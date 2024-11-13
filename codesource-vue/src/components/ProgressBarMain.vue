<template>
    <div id="sample">
     <el-progress
         :percentage="Linelong"
         :stroke-width="15"
         striped
         striped-flow
         :duration="100"
     />
    </div>
</template>

<script>
export default{
    data(){

    },
    components:{

    },
    props:{
        //接受一个长度 0-100
        Linelong:{
            type:Number,
            Required: true,
        }
    },
    watch:{
    
    }
}
</script>

<style scoped>
#sample{
    margin: 10px;
}
</style>