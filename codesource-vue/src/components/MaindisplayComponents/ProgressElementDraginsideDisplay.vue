<template>
        <div id="insideProgress"
         :style="{top: heightLoc + 'px'}"
        >
        <h1 style="margin: 10px;">{{ countlist }}</h1>
        <el-icon 
            id="deletinsideelement" 
            :size="15" 
            @click="deletProgress"
            ><Delete />
        </el-icon>
        </div>
</template>

<script>
export default{
    data(){
        return{
           
        };
    },
    mounted(){
        //document.addEventListener('contextmenu', this.disableRightClick);
    },
    methods:{
        //用于向上层上传队列位置
        deletProgress(event){
            event.stopPropagation();
            this.$emit('deletelement',this.countlist);
            
                
        },
        //禁用右键
        disableRightClick(){
            event.preventDefault();
        }
    },
    components:{

    },
    props:{
        heightLoc:Number,
        countlist:Number,
    },
    watch:{
        heightLoc(newVal){
            console.log("heightLoc newVal",newVal);
        }
    }
}
</script>

<style scoped>
#insideProgress{
    width: 175px;
    height: 50px;
    background-color: #f8f8f8;
    outline: 1px solid #a4a4a4;
    position: absolute;
    top: 40px;
    right: 7.5px;
    border-radius: 4px;
    display: flex;
    box-shadow: 0px 1px 1px rgba(217, 220, 220, 0.842);
}
#deletinsideelement{
    position: absolute;
    right: 0;
    top: 0;
    margin: 4px;
    opacity: 40%;
}
</style>