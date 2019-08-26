<template>
    <div id="home">
        <el-container style="height: 100vh">
            <el-header class="headerStyle">
                <div class="headerBox">
                    <span class="logoName web-font">聚通达运营管理平台</span>
                    <div class="account">
                        <el-popover popper-class="userStyle" placement="bottom-end" width="200" trigger="click" @show="show" @hide="hide">
                            <p class="accountStyle">{{account}}</p>
                            <p class="mobileStyle">{{mobile}}</p>
                            <p class="line"></p>
                            <p class="loginOutStyle" @click="signOut">退出</p>
                            <el-button id="accountName" type="primary" slot="reference">
                                <i v-if="upIcon" class="el-icon-arrow-down el-icon--right"></i>
                                <i v-if="!upIcon" class="el-icon-arrow-up el-icon--right"></i>
                            </el-button>
                        </el-popover>
                    </div>
                    <span class="accountImg"> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></span>
                </div>
            </el-header>
            <el-container class="container">
                <p @click="up">
                    <span :class="[isRetract ? 'upBtn' : 'downBtn']">
                      <svg t="1565612487697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9446" width="200" height="200"><path d="M131.11 192.37m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#999999" p-id="9447"></path><path d="M131.11 766.83m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#999999" p-id="9448"></path><path d="M449.33 385.09m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#999999" p-id="9449"></path><path d="M449.33 578.11m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#999999" p-id="9450"></path><path d="M129.91 512.16L321.14 639.7V384.62L129.91 512.16z" fill="#999999" p-id="9451"></path></svg>
                    </span>
                </p>
                <el-aside id="aside" :width="asideWidth" >
                    <el-menu :collapse-transition="false" :default-active="activeIndex" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#fafafa">
                        <el-menu-item v-for="(item,index) in navMenuList" :index="item.menuUrl">
                            <i class="el-icon-user"></i>
                            <span slot="title" class="web-font">{{item.label}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                account:this.$store.state.userName||JSON.parse(sessionStorage.getItem("userFullName")),
                mobile:this.$store.state.mobile||JSON.parse(sessionStorage.getItem("mobile")),
                isCollapse: false,
                asideWidth:"200px",
                isRetract:true,
                navMenuList:[],
                upIcon:true,
            };
        },
        methods: {
            //退出
            signOut(){
                this.$message("退出成功");
                this.$router.push('/Login');
            },
            //打开菜单栏
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            //关闭菜单栏
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //收起
            up(){
                this.isCollapse=!this.isCollapse;
                if(this.isCollapse){
                    this.asideWidth="64px";
                    this.isRetract=false;
                }else {
                    this.asideWidth="200px";
                    this.isRetract=true;
                }
            },
            //显示
            show(){
                this.upIcon=false
            },
            hide(){
                this.upIcon=true;
            }
        },
        mounted() {
           this.navMenuList=JSON.parse(sessionStorage.getItem("getNaviMenuList"));
           //监听页面刷新事件
            window.onbeforeunload = function (e) {
                e = e || window.event;
                // 兼容IE8和Firefox 4之前的版本
                if (e) {
                    e.returnValue = '关闭提示';
                }
                // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                this.account = this.$store.state.userName || JSON.parse(sessionStorage.getItem("userFullName"));
                this.mobile = this.$store.state.mobile || JSON.parse(sessionStorage.getItem("mobile"));
                return '关闭提示';
            };
        },
        watch: {
            $route() {
                if(this.$router.path==="/role/Index"||this.$router.path==="/role/RoleUser"||this.$router.path==="/role/PermissionConfiguration"){
                    return "/role/Index";
                }else if(this.$router.path==='/account/Index'||this.$router.path==='/account/PermissionConfiguration'){
                    return "/account/Index";
                }else if(this.$router.path==='/function/Index'){
                    return "/function/Index";
                }else {
                    return this.$route.path;
                }
            }
        },
        computed:{
            activeIndex(){
                if(this.$route.path==="/role/Index"||this.$route.path==="/role/RoleUser"||this.$route.path==="/role/PermissionConfiguration"){
                    return "/role/Index";
                }else if(this.$route.path==='/account/Index'||this.$route.path==='/account/PermissionConfiguration'){
                    return "/account/Index";
                }else if(this.$route.path==='/function/Index'){
                    return "/function/Index";
                }else {
                    return this.$route.path;
                }
            }
        },
    }
</script>
<style lang="less" scoped>
    .el-header {
        background-color: #578ebe;
        color: #333;
        height: 50px !important;
        text-align: center;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.04);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.04);
    }
    .headerBox{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 0 auto;
        .signOut{
            float: right;
            margin: 10px 0;
        }
        .logoName{
            float: left;
            display: inline-block;
            width: 200px;
            height: 40px;
            line-height: 40px;
            margin: 5px 0 0 5px;
            color: #fff;
            letter-spacing: 2px;
            font-family:"webfont" !important;
            font-size:20px;font-style:normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
            img{
                height: 30px;
                width: auto;
                margin-top: 10px;
            }
        }
        .accountImg{
            display: inline-block;
            height: 40px;
            line-height: 40px;
            float: right;
            margin-right: -16px;
            .el-avatar{
                margin-top: 5px;
            }
        }
        .account{
            float: right;
            height: 50px;
            line-height: 50px;
            color: #ffffff;
            font-size: 16px;
            margin: 0;
            margin-right: 16px;
            cursor: pointer;
            .el-dropdown-link{
                color: #ffffff;
                font-family:"webfont" !important;
            }
            .el-dropdown-link:hover{
                color: #b9f0ff;
            }
        }
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        width: 200px;
        line-height: 260px;
    }

    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 30px;
    }

    .el-container .el-aside {
        line-height: 500px;
    }

    .el-header .el-container {
        width: 95%;
        margin: 0 auto;
        background-color: #E9EEF3
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    #home .container {
        width: 100%;
        background-color:#545c64;
        height: 100vh;
        position: relative;
    }
    #home .el-submenu__title{
        padding: 0 10px;
        text-align: left;
        color: #333333;
    }
    #home .el-menu-item{
        padding: 0 10px;
        text-align: left;
        color: #333333;
    }
    #home .el-submenu{
        text-align: left;
        color: #333333;
    }
    #home .el-submenu__title *{
        color: #333333;
    }
    #aside{
        width: 200px;
        height: calc( 100% - 30px);
        margin-top: 30px;
        background-color:#fafafa;
        overflow-x:hidden;
        border-top: 1px solid #ccc;
        border-right:1px solid #ccc;
    }
    .upBtn{
        position: absolute;
        left: 0;
        top:0;
        height: 30px;
        line-height: 36px;
        border-bottom:1px solid #ccc ;
        text-align: center;
        width: 199px;
        background-color: #fafafa;
        border-right:1px solid #ccc;
        cursor: pointer;
    }
    .downBtn{
        position: absolute;
        left: 0;
        top:0;
        height: 30px;
        line-height: 36px;
        border-bottom:1px solid #ccc ;
        text-align: center;
        width: 63px;
        background-color: #fafafa;
        border-right:1px solid #ccc;
        cursor: pointer;
    }
    #app .el-main{
        padding: 0;
        box-shadow: inset -1px 0 0 #e5e5e5;
    }
    #home .el-menu .is-active ,.el-menu-item.is-active {
        background-color: #409EFF !important;
    }
    #home .el-menu .is-active span,.el-menu-item.is-active span{
        color:#fff;
    }
    #home #accountName{
        background-color: #578ebe;
        border-color: #578ebe;
        .el-button--primary{
            border-color: #578ebe;
        }
    }
</style>
<style>
    .userStyle{
        padding: 0;
    }
    .userStyle .accountStyle{
        cursor: pointer;
        margin: 15px 10px 5px 10px;
        font-weight: bold;
        font-family:"webfont"
    }
    .userStyle .loginOutStyle:hover{
        background-color: #eee;
    }
    .userStyle .mobileStyle{
        cursor: pointer;
        margin: 0 10px 10px 10px;
        font-weight: normal;
        font-family:"webfont";
        font-size: 14px;
    }
    .userStyle .loginOutStyle{
        cursor: pointer;
        padding: 8px 12px;
        text-indent: 2px;
        margin: 4px 0 8px 0;
        font-weight: normal;
        font-family:"webfont";
        font-size: 14px;
    }
    .userStyle .line{
        height: 1px;
        width: 100%;
        background-color: #dfdfdf;
        margin: 0;
    }
</style>
