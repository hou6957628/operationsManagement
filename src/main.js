import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookie from 'vue-cookie'
//VueCookie
Vue.use(VueCookie);
import qs from 'qs';
// * element you need
// import "./plugins/element.js";

// test element all
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/tabs.css';
Vue.use(ElementUI);

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

// cookies
import VueCookies from "vue-cookies"
Vue.use(VueCookies)

//qs
Vue.prototype.$qs=qs;

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
