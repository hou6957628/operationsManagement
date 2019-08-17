<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: "app",
};
</script>

<style lang="less">
body,html{ padding: 0; margin:0;height: 100%;width: 100% }
#app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;

    .nav {
        a {
            margin: 10px;
            display: inline-block;
        }
    }
}
@font-face {
    font-family: "webfont";
    font-display: swap;
    src: url('./assets/icon/webfont.eot'); /* IE9 */
    src: url('./assets/icon/webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('./assets/icon/webfont.woff2') format('woff2'),
    url('./assets/icon/webfont.woff') format('woff'), /* chrome、firefox */
    url('./assets/icon/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('./assets/icon/webfont.svg#webfont') format('svg'); /* iOS 4.1- */
}
.web-font{
    font-family:"webfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
