<template>
    <div :style="{width: pagewidth - 140 + 'px',}" id="linetime">
        <div id="lineElement_start" :style="{left: ctrlstartmove + 'px',}">
            <h2 v-if="is_Definite" style="position: absolute; top: -20px; left: 20px; color: rgb(97, 97, 97);" >{{ count }}</h2>
            <div  v-if="!is_Definite" style="width: 1000px; height: 40px; position: absolute; top: -15px; left: 20px; ">
                <input
                    v-if="inputdispaly"
                    autocomplete="off"
                    ref="inputref" id="inputborad"
                    @keyup="Headerskeyup" 
                    @click="inputfocus"
                    v-model="progressinput" 
                    placeholder= 'YYYY/MM/DD'
                >
                <h2 v-if="!inputdispaly"> No set start time</h2>
                <div id="message" v-if="!inputdispaly">
                    <el-button  type="success" color="#125B50" plain @click="settime" style="width: 70px;">
                        <h3>Set</h3>
                        <!-- <el-icon size="20" style="margin: 10px;"><FolderAdd /></el-icon> -->
                    </el-button>
                </div>
                <div id="message" v-if="inputdispaly">
                    <el-button  type="success" color="#125B50" plain @click="savetime " style="width: 70px;">
                        <h3>Save</h3>
                        <!-- <el-icon size="20" style="margin: 10px;"><FolderAdd /></el-icon> -->
                    </el-button>
                </div>
            </div>
        </div>
        <!-- <div id="lineElement_end" :style="{right: ctrlendmove + 'px',}">
            <h3 style="position: absolute; top: -9px; left: 20px;" >{{  }}</h3>
        </div> -->
        <div style="left: 0px;" id="start_end"></div>
        <div style="right: 0px;" id="start_end"></div>
    </div>
    <!-- <div id="lineElement_done"></div> -->
    
</template>
<script>
import { ElNotification } from 'element-plus';

export default{
    data(){
        return{
            ctrlstartmove:0,
            ctrlendmove:0,

            //test
            count: '0',

            //前后日期变化

            //初始日期是否被初始化状态
            is_Definite:false,

            //输入框bool
            inputdispaly:false,

            //输入框内的变量
            progressinput: '',
        }
    },
    props:{
        starttime:Number,
        pagewidth:Number,
        pagecontainerleft:Number,
        pagecontainerright:Number,

        //接受是否被设定好起始时间
        
    },
    watch:{
        //一天是200px
        //起始点的误差为60px

        pagecontainerleft(newval){
            if(this.is_Definite){
                    this.count = this.dateInit(this.constdate);
                const overmove = 60;
                if((newval) > overmove){
                    this.ctrlstartmove = (newval) - 60; 
                    let countNum = Math.floor(this.ctrlstartmove / 200);

                    let newDate = new Date(this.daydata);
                    newDate.setDate(newDate.getDate() + countNum);
                    this.constdate = newDate;

                }else{
                    this.ctrlstartmove = 0;
                }
            }
        },
        is_Definite(newVal){
            if(newVal){this.firstSetTime}
        },
    },
    methods:{
        //格式化日期函数
        dateInit(timedate){
            let day = timedate.getDate();
            let Monthdata = ( this.constdate.getMonth() + 1);
            let Year = timedate.getFullYear().toString();
            return `${Year}/${Monthdata}/${day}`;
        },
        settime(){
            this.inputdispaly = true;
        },
        savetime(){
            const Year =  Number(this.progressinput.substring(0,4));
            const Month =  Number(this.progressinput.substring(5,7));
            const Day =  Number(this.progressinput.substring(8,10));
            this.firstSetTime(Year,Month,Day);
            console.log("set->",`${Year}/${Month}/${Day}`);
            this.inputdispaly = false;
        },
        Headerskeyup(event){
            if(event.key == 'Enter'){
                this.savetime();
            }
        },
        //初始化日期函数
        firstSetTime(Year,Month,Day){
            //验证合法性
            if(0 > Month || 12 < Month || 0 > Day || 31 < Day){

                //做出提示
                ElNotification({
                  title: 'error',
                  dangerouslyUseHTMLString: true,
                  message: '<strong>输入设定时间不合法</strong>',
                  type: 'error',
                })
                this.progressinput = '';
                return;
            }
            //获取当天日期
            this.daydata = new Date(Year, Month - 1, Day);
            this.constdate = new Date(Year, Month - 1, Day);
            this.count = this.dateInit(this.constdate);

            this.is_Definite = true;

            //向上级父组件进行推送告知起始日期
            this.$emit('is_define',this.daydata);

            //做出提示
            ElNotification({
              title: 'Success',
              dangerouslyUseHTMLString: true,
              message: '<strong>成功创建起始任务时间</strong>',
            //   message: '成功创建起始任务时间',
              type: 'success',
            })
        }

    },
    mounted(){
        
    }   
}
</script>
<style scoped>
#lineElement_done{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

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
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

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
#message{
    border-radius: 5px;
    width: 70px;
    height: 30px;
    position: absolute;
    left: 210px;
    top: 20px;
}
#inputborad{
    position: absolute;
    top: 19px;
    width: 195px;
    height: 30px;
    border-radius: 10px;
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */
    border: 1px solid #ccc; /* 自定义边框样式 */
}
</style>