import {fetchPost} from './Http'

/**
 * 以下接口参数类型均为Obect {}
 */
export default {
    // 登录
    Login: {
        //登录
        loginIn(params) {
            return fetchPost('/admin/auth/login', params)
        },
        //找回密码
        fingPassword(params) {
            return fetchPost('/admin/user/changePass', params)
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
        },
        //获取图片验证码
        getCaptcha(params) {
            return fetchPost('/admin/auth/getCaptcha', params)
        }
    },
    //账户
    Accout: {
        //获取账户列表
        getAccountList(params) {
            return fetchPost('/admin/user/listUsers', params)
        },
        //账户修改接口
        updateUser(parmas) {
            return fetchPost('/admin/user/updateUser', parmas)
        },
        //账户新增接口
        addUser(parmas) {
            return fetchPost('/admin/user/addUser', parmas)
        },
        //删除账户接口
        daleteUser(parmas) {
            return fetchPost('/admin/user/deleteUserById', parmas)
        },
        //账户条件筛选查询
        searchAccount(parmas) {
            return fetchPost('/admin/user/listUsers', parmas)
        },
        //根据账户ID查询权限
        getUserById(parmas) {
            return fetchPost('/admin/user/getUserById', parmas)
        },
        //修改当前用户的权限树
        upDateUserRole(parmas) {
            return fetchPost('/admin/user/updateUserFunc', parmas)
        },
        //根据用户获取角色分页列表接口
        listCurrUserRoles(parmas) {
            return fetchPost('/admin/role/listCurrUserRoles', parmas)
        },
        //修改用户角色分配
        updateUserRole(parmas) {
            return fetchPost('/admin/role/updateUserRole', parmas)
        },
    },
    //角色
    Role: {
        //获取角色列表
        getRoleList(params) {
            return fetchPost('/admin/role/listRoles', params);
        },
        //角色新增接口
        addRole(parmas) {
            return fetchPost('/admin/role/addOrUpdateRole', parmas)
        },
        //角色修改接口
        updateRole(parmas) {
            return fetchPost('/admin/role/addOrUpdateRole', parmas)
        },
        //删除角色接口
        daleteRole(parmas) {
            return fetchPost('/admin/role/deleteRoleById', parmas)
        },
        //获取角色相关联的用户与功能
        getRoleFunction(parmas) {
            return fetchPost('/admin/role/getRoleById', parmas)
        },
        //修改角色相关联的功能
        upDateRoleFunc(parmas) {
            return fetchPost('/admin/role/updateRoleFunc', parmas)
        },
        //从角色中移除这个账户
        deleteUserRole(parmas) {
            return fetchPost('/admin/role/deleteUserRole', parmas)
        },
        //按条件分页查询角色用户
        searchRoleUser(parmas){
            return fetchPost('/admin/role/listRoles', parmas)
        },
    },
    //功能
    Function: {
        //获取功能列表
        getFunctionList(params) {
            return fetchPost('/admin/func/getFuncByUserId', params);
        },
        //添加功能菜单
        addFunctionList(params) {
            return fetchPost('/admin/func/addOrUpdateFunc', params);
        },
        //删除功能菜单
        deleteFunctionList(params) {
            return fetchPost('/admin/func/deleteFuncById', params);
        },
        //修改功能菜单
        editFunctionList(params) {
            return fetchPost('/admin/func/addOrUpdateFunc', params);
        },
        //根据ID获取功能
        getFuncById(params) {
            return fetchPost('/admin/func/getFuncById', params);
          }
    },
}
