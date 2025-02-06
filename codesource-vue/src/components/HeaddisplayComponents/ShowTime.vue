<template>
    <div id="clock-container">
        <!-- <div id="backgrand"></div> -->
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
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        setInterval(this.updateTime, 1000);
        this.updateTime();
    },
    methods: {
        updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const yesrs = String(now.getFullYear()).padStart(2, '0');
            const Month = String(now.getMonth() + 1).padStart(2, '0'); 
            const day = String(now.getDate()).padStart(2, '0'); 

            document.getElementById('now').textContent = hours + " " + minutes;
            document.getElementById('yearmon').textContent = yesrs + '/' + Month + '/' + day;

            const move = document.getElementById('now_move');
            if (move.textContent == ':') {
                move.textContent = ' ';
            } else {
                move.textContent = ':';
            }
        }
    }
}
</script>

<style scoped>
#clock-container {
    transform: scale(0.8); /* 时钟的缩放比例 */
    /* transform-origin: top left; 缩放的原点，默认是中心 */
}

#now {
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
#now_move {
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    width: auto;
    height: 40px;
    font-size: 270%;
    position: absolute;
    left: 62px;
    top: -5px;
    color: #b1b1b1;
    font-weight: bold; /* 设置为粗体 */
}
#yearmon {
    -webkit-user-select: none; /* 适用于谷歌浏览器和Safari */ -moz-user-select: none; /* 适用于火狐浏览器 */ -ms-user-select: none; /* 适用于Internet Explorer/Edge */ user-select: none; /* 适用于支持CSS3的浏览器 */

    width: auto;
    height: 40px;
    font-size: 120%;
    position: absolute;
    left: 140px;
    top: 20px;
    color: #b1b1b1;
    font-weight: bold; /* 设置为粗体 */
}
#backgrand {
    width: 310px;
    height: 50px;
    background-color: #eeeeee;
    border-radius: 10px;
    position: absolute;
    left: 2px;
    top: 0px;
    outline: 2px solid #cecece;
}
</style>