<template>
    <div id="element" @mousedown.stop="startDrag"></div>
</template>

<script>

export default{
    data(){
        return{
            shiftX: 0,
            shiftY: 0,
        };
    },
    mounted(){
        this.element = document.getElementById('element');
        this.starthelper = (event) => this.onDrag(event);
        this.stophelper = () => this.stopDrag;
    },
    methods:{
        startDrag(event){
            if(this.element){

                console.log('startDrag');
                //记录初始状态
                this.shiftX = event.clientX;
                this.shiftY = event.clientY;
                console.log('insideProess: shiftX , shiftY',this.shiftX,this.shiftY);

                document.addEventListener('mousedown',this.starthelper);
                document.addEventListener('mouseleave',this.starthelper);
                document.addEventListener('mouseup',this.stophelper);

            }else{
                console.error('No init');
            }
        },
        onDrag(event){

            //记录位置

            const elementLocLeft = this.element.getBoundingClientRect().left;
            const elementLocTop = this.element.getBoundingClientRect().top;
            //if(!elementLocLeft){console.error('not find elementloc');}
            console.log('elementLocLeft',elementLocLeft);
            console.log('elementLocTop',elementLocTop);

            const movePointLeft = event.clientX;
            const movePointTop = event.clientY;

            console.log('movePointLeft',movePointLeft);
            console.log('movePointTop',movePointTop);
            //console.log('this.containerBound',this.containerBound);
            this.element.style.left = elementLocLeft - this.containerBound + (movePointLeft - this.shiftX);
            this.element.style.top = elementLocTop + movePointTop - this.shiftY;
        },
        stopDrag(){
            if(this.element){
                document.removeEventListener('mousedown',this.starthelper);
                document.removeEventListener('mouseup',this.stophelper);
                document.removeEventListener('mouseleave',this.stophelper);
            }else{
                console.error('No init');
            }
        }

    },
    props:{
        containerBound:Number,
    },
    watch:{
        containerBound(newVal){

            //调试数据
            console.log("containerBoundVal -> ",newVal);
        }
    }
}
</script>

<style scoped>
#element{
    margin: 10px;
    width: 100px;
    height: 40px;
    background-color: #E6FF94;
    outline: 2px solid #40A578;
    border-radius: 10px;
}
</style>