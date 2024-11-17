<template>
        <div id="start" :style="{left: point[0].left + 'px' , top: point[0].top + 'px'}" >

        </div>
        <div id="end" :style="{left: point[1].left + 'px' , top: point[1].top + 'px'}" >

        </div>
</template>

<script>

export default {    
    components:{

    },
    data(){
        return{

        }
    },
    props:{
        point:{
            type:Array,
            Required:true,
            default(){
                return[
                    {left: 0, top: 0},
                    {left: 0, top: 0},
                ];
            }
        }

    },
    mounted(){
       
    }
}
</script>

<style scoped>
#start,#end{
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #e6e6e6;
    border-radius: 10px;
    outline: 3px solid #9ea3a9;
}

#main{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>