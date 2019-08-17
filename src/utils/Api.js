import {fetchPost} from './Http'
/**
 * 以下接口参数类型均为Obect {}
 */
export default {
    // 登录
    Login: {
        //登录
        loginIn(params) {
            return fetchPost('/admin/auth/login',params)
        },
        //找回密码
        fingPassword(params){
            return fetchPost('/admin/user/changePass',params)
        },
        //获取用户权限
        userDetail(params) {
            return fetchPost('/operation/userDetail', params)
        },
        userMenus(params) {
            return fetchPost('/operation/userMenus', params)
        },
        //登出
        logout(params) {
            return fetchPost('/operation/logout', params)
        }
    },
    //账户
    Accout:{
        //获取账户列表
        getAccountList(params){
            return fetchPost('/admin/user/listUsers',params)
        },
        //账户修改接口
        updateUser(parmas){
            return fetchPost('/admin/user/updateUser',parmas)
        },
        //账户新增接口
        addUser(parmas){
            return fetchPost('/admin/user/addUser',parmas)
        },
        //删除账户接口
        daleteUser(parmas){
            return fetchPost('/admin/user/deleteUserById',parmas)
        }
    },
    //角色
    Role:{
        //获取角色列表
        getRoleList(params){
            return fetchPost('/admin/role/listRoles',params)
        },
        //角色新增接口
        addRole(parmas){
            return fetchPost('/admin/role/addOrUpdateRole',parmas)
        },
        //角色修改接口
        updateRole(parmas){
            return fetchPost('/admin/role/addOrUpdateRole',parmas)
        },
        //删除角色接口
        daleteRole(parmas){
            return fetchPost('/admin/role/deleteRoleById',parmas)
        }
    },
    //功能
}
