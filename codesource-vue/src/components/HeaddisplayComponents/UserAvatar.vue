<template>
    <el-button class="user-button" circle>
        <span class="icon">X</span>
    </el-button>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>

<style scoped>
.user-button {
    width: 55px; /* 设置按钮宽度 */
    height: 55px; /* 设置按钮高度 */
    margin: 5px;
    padding: 0; /* 去除内边距 */
    background-color: #e9f5ff; /* 背景透明 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* 鼠标悬停时显示为手型 */
    transition: transform 0.1s ease, box-shadow 0.1s ease; /*缓动效果*/
}

.user-button:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 悬浮时添加阴影 */
}

.user-button:active {
    transform: translateY(2px); /* 悬浮时略微下凹 */
    color: #303030; /* 点击时颜色加深 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 点击时阴影变小 */
}

.icon {
    font-size: 35px; /* 设置图标大小 */
    color: #606060; /* 设置图标颜色 */
}
</style>