<template>
    <div :style="{width: pagewidth - 140 + 'px',}" id="linetime">
        <div id="lineElement_start" :style="{left: ctrlstartmove + 'px',}">
            <h3 style="position: absolute; top: -9px; left: 20px;" >{{  }}</h3>
        </div>
        <!-- <div id="lineElement_end" :style="{right: ctrlendmove + 'px',}">
            <h3 style="position: absolute; top: -9px; left: 20px;" >{{  }}</h3>
        </div> -->
        <div style="left: 0px;" id="start_end"></div>
        <div style="right: 0px;" id="start_end"></div>
    </div>
    <div id="lineElement_done"></div>
    
</template>
<script>

export default{
    data(){
        return{
            ctrlstartmove:0,
            ctrlendmove:0,

        }
    },
    props:{
        starttime:Number,
        pagewidth:Number,
        pagecontainerleft:Number,
        pagecontainerright:Number
    },
    watch:{
        pagecontainerleft(newval){
            console.log("pagecontainerleft->",newval);
            const overmove = 60;
            if((newval) > overmove){
                this.ctrlstartmove = (newval) - 60; 
            }else{
                this.ctrlstartmove = 0;
            }
        },
        // pagecontainerright(newval){
        //     const windowhigth = window.innerHeight;
        //     const overmove = 715 - (windowhigth - 680);
        //     if(newval -overmove > windowhigth ){
        //         this.ctrlendmove = newval - overmove -windowhigth;
        //     }else{
        //         this.ctrlendmove = 0;
        //     }
        // }
    }
}
</script>
<style scoped>
#lineElement_done{
    background-color: rgb(123, 198, 155);
    width: 8px;
    height: 30px;
    border-radius: 5px;
    position: absolute;
    top: 48px;
    left: 400px;
    opacity: 70%;
    outline: 3px solid darkgreen;

}
#lineElement_end{
    right: 0px;
    background-color: rgb(192, 192, 192);
    width: 8px;
    height: 30px;
    border-radius: 3px;
    position: absolute;
    top: 23px;
    opacity: 70%;
    outline: 3px solid rgb(97, 97, 97);
}
#lineElement_start{
    background-color: rgb(192, 192, 192);
    width: 8px;
    height: 30px;
    border-radius: 3px;
    position: absolute;
    top: 23px;

    opacity: 70%;
    outline: 3px solid rgb(97, 97, 97);
}
#linetime{
    background-color: rgb(170, 170, 170);
    height: 3px;
    border-radius: 3px;
    position: absolute;
    top: 20px;
    left: 70px;
    /* outline: 1px solid darkgreen; */
    /* opacity: 30%; */
}
#start_end{
    width: 15px;
    height: 15px;
    background-color: rgb(203, 203, 203);
    position: absolute;
    border-radius: 10px;
    outline: 5px solid rgb(152, 152, 152);
    top: -5px;
}
</style>