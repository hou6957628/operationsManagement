import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import Api from '@/utils/Api';

Vue.prototype.$Api = Api;

const router = new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            meta: {title: 'login'},
            component: resolve => require(['./views/Login.vue'], resolve),
        },
        {
            path: "/Login",
            name: "Login",
            meta: {title: 'login'},
            component: resolve => require(['./views/Login.vue'], resolve),
        },
        {
            path: "/home",
            name: "Home",
            meta: {title: 'home'},
            redirect: "/role/Index",
            component: resolve => require(['./views/Home.vue'], resolve),
            children: [
                {
                    path: "/role/Index",
                    name: "角色管理",
                    meta: {title: 'Index'},
                    component: resolve => require(['./views/RolelManage/Index.vue'], resolve)
                },
                {
                    path: "/role/RoleUser",
                    name: "查看角色用户",
                    meta: {title: 'RoleUser'},
                    component: resolve => require(['./views/RolelManage/RoleUser.vue'], resolve)
                },
                {
                    path: "/account/Index",
                    name: "账户管理",
                    meta: {title: 'Index'},
                    component: resolve => require(['./views/AccountIManage/Index.vue'], resolve)
                },{
                    path: "/account/Detail",
                    name: "账户详情",
                    meta: {title: 'Detail'},
                    component: resolve => require(['./views/AccountIManage/Detail.vue'], resolve)
                },
                {
                    path: "/function/Index",
                    name: "系统功能管理",
                    meta: {title: 'Index'},
                    component: resolve => require(['./views/FunctionIManage/Index.vue'], resolve)
                },
                {
                    path: "/permissionsTree/Index",
                    name: "系统功能管理",
                    meta: {title: 'Index'},
                    component: resolve => require(['./views/PermissionsITree/Index.vue'], resolve)
                },
                {
                    path: "/TreeComponent",
                    name: "TreeComponent",
                    meta: {title: 'DemoTree'},
                    component: resolve => require(['./components/TreeComponent.vue'], resolve)
                },
            ]
        },
        {
            path: "*",
            name: "404",
            meta: {title: 'notfound'},
            component: resolve => require(['./components/404'], resolve)
        }

    ]
});
router.beforeEach((to, from, next) => {
    // 业务逻辑
    // console.log(to);
    next()
})

router.afterEach(() => {
    // 业务逻辑
})

export default router
