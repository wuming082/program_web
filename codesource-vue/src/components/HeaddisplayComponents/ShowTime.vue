<!-- 时间组件 -->

<template>
    <div id="time">
        <div id="now">
            XX:XX
        </div>
        <div id="now_move">
            :
        </div>
        <div id="yearmon">
            no define
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    mounted(){
        setInterval(this.updateTime, 1000);
        this.updateTime();
    },
    methods:{
        updateTime(){
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const yesrs = String(now.getFullYear()).padStart(2, '0');
            const Month = String(now.getMonth()).padStart(2, '0');
            const day = String(now.getDay()).padStart(2, '0');
            //const seconds = String(now.getSeconds()).padStart(2, '0');

            document.getElementById('now').textContent = hours + " " + minutes;
            //document.getElementById('seconds').textContent = seconds;
            document.getElementById('yearmon').textContent = yesrs + '/' + Month + '/' + day;

            const move = document.getElementById('now_move');
            if(move.textContent == ':'){
                move.textContent = ' ';
            }else{
                move.textContent = ':';
            }
        }
    }
}
</script>

<style scoped>
#now{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    width: 200px;
    height: 40px;
    font-size: 270%;
    position: absolute;
    left: 10px;
    top: -5px;
    color: #909090;
    font-weight: bold; /* 设置为粗体 */
}
#now_move{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    width: 200px;
    height: 40px;
    font-size: 270%;
    position: absolute;
    left: 62px;
    top: -5px;
    color: #b1b1b1;
    font-weight: bold; /* 设置为粗体 */
}
#yearmon{
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    width: 400px;
    height: 40px;
    font-size: 170%;
    position: absolute;
    left: 140px;
    top: 12px;
    color: #b1b1b1;
    font-weight: bold; /* 设置为粗体 */
}
</style>