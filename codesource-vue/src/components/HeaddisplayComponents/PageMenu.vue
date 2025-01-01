<template>
    <el-button class="menu-button">
        <span class="icon">☰</span>
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
.menu-button {
    width: 62px; /* 设置按钮宽度 */
    height: 62px; /* 设置按钮高度 */
    margin-bottom: 3px;
    padding: 0; /* 去除内边距 */
    background-color: transparent; /* 背景透明 */
    border: none; /* 去除边框 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* 鼠标悬停时显示为手型 */
    transition: transform 0.1s ease, box-shadow 0.1s ease; /*缓动效果*/
}

.menu-button:hover {
    transform: translateY(2px); /* 悬浮时略微下凹 */
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* 悬浮时添加阴影 */
}

.menu-button:active {
    transform: translateY(4px); /* 点击时进一步下凹 */
    color: #303030; /* 点击时颜色加深 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 点击时阴影变小 */
}

.icon {
    font-size: 45px; /* 设置图标大小 */
    color: #606060; /* 设置图标颜色 */
}
</style>