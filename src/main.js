import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookie from 'vue-cookie';
import i18n from './lang/index'
//VueCookie
Vue.use(VueCookie);
import qs from 'qs';
// * element you need
// import "./plugins/element.js";

// test element all
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/tabs.css';
Vue.use(ElementUI,{
    size:"medium",
    // i18n:(key,value)=>i18n.t(key,value)
});

// iconfont
import "./assets/icon.js"
import "./assets/css/common.less"

// axios
import axios from "axios"
axios.defaults.retry = 5
axios.defaults.retryDelay = 600
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // axios.defaults.baseURL = '/apis/'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    axios.defaults.baseURL = process.env.VUE_APP_HOST_URL
} else {
    axios.defaults.baseURL = '/apis/'
}

// api
import http from "./utils/Api"
Vue.prototype.$http = http

//qs
Vue.prototype.$qs=qs;

//按钮权限
function hasButton(code) {
    let codeKey=[];
    let codeMap=JSON.parse(sessionStorage.getItem("actionList"));
    for (let i in codeMap) {
        codeKey.push(Object.keys(codeMap[i]).toString())
    }
    let codeList=[...codeKey];
    return codeList.includes(code);
}
Vue.prototype.$hasButton = hasButton;

//返回上一步
function goBack() {
    this.$router.back(-1);
}
Vue.prototype.$goBack = goBack;

//页数,总数，数组为0的初始化
function pageNoZero(data, number) {
    if (data === 0) {
        data = number
    }
    return data
}
Vue.prototype.$pageNoZero=pageNoZero;

//选取节点
function getCheckedKeys (data, keys, key) {
    var res = [];
    recursion(data, false);
    return res;
    // arr -> 树形总数据
    // keys -> getCheckedKeys获取到的选中key值
    // isChild -> 用来判断是否是子节点
    function recursion (arr, isChild) {
        var aCheck = [];
        for ( var i = 0; i < arr.length; i++ ) {
            var obj = arr[i];
            aCheck[i] = false;
            if ( obj.children ) {
                aCheck[i] = recursion(obj.children, true) ? true : aCheck[i];
                if ( aCheck[i] ) {
                    res.push(obj[key]);
                }
            }
            for ( var j = 0; j < keys.length; j++ ) {
                if ( obj[key] == keys[j] ) {
                    aCheck[i] = true;
                    if ( res.indexOf(obj[key]) == -1 ) {
                        res.push(obj[key]);
                    }
                    break;
                }
            }
        }
        if ( isChild ) {
            return aCheck.indexOf(true) != -1;
        }
    }
};
Vue.prototype.$getCheckedKeys = getCheckedKeys;

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
