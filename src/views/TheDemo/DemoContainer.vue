<template>
<div>
    <el-container>
        <el-header>
            <el-container>header</el-container>
        </el-header>
        <el-container class="container">
            <el-aside>Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</div>
</template>

<style lang="less" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 200px;
    line-height: 260px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

.el-container .el-aside {
    line-height: 500px;
}

.el-header .el-container {
    width: 1000px;
    margin: 0 auto;
    background-color: #E9EEF3
}

.el-container.container {
    width: 1000px;
    margin: 20px auto 0 auto;
}
</style>
