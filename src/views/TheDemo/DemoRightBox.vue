<template>
<div style="rightpage">
    <div>右侧菜单</div>
    <el-button @click="show = !show">点击打开 Message Box</el-button>
    <transition leave-active-class="animated bounceOutRight" name="fade custom-classes-transition" enter-active-class="animated tada" v-on:before-leave="beforeLeave">
        <div v-show="show">
            <div ref="rightBox" class="rightBox">
                <h2> 标题</h2>
                <div>
                    <el-button @click="closeBox">关闭</el-button>
                </div>
            </div>
        </div>
    </transition>

</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            clientHeight: '',
        }
    },
    watch: {
        clientHeight: function () {
            this.changeFixed(this.clientHeight)
        }
    },
    methods: {
        closeBox() {
            this.show = false;
        },
        changeFixed(clientHeight) {
            this.$refs.rightBox.style.height = clientHeight + 'px';
        },
        beforeLeave: function (el) {
            console.log("beforeLeave")
        },
    },
    mounted() {
        this.$refs.rightBox.style.height = document.documentElement.clientHeight + "px";
        window.onresize = function temp() {
            this.clientHeight = `${document.documentElement.clientHeight}`;
            console.log(this.clientHeight)
        };
    }
}
</script>

<style lang="less" scoped>
.rightBox {
    width: 500px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0 2px 2px 4px rgba(0, 0, 0, .04);
    border-right: 1px solid#ccc;
    box-sizing: border-box;

    h2 {
        font-size: 14px;
        font-weight: normal;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        line-height: 30px;
        text-align: left;
        padding-left: 10px;
    }
}

.rightpage {
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
    right: 0;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    right: -10px;
}
</style>
