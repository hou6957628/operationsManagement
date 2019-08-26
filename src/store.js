import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      roleId:"",
      RoleFunction:'',
      userId:"",
      roleName:"",
      functionId:"",
      breadcrumb:"",
      breadname:"",
      naviMenuList:[],
      codeMap: {},
      userName:'',
      treeList:[],
      mobile:'',
  },
  mutations: {
      getRoleId(state, d) {
          state.roleId = d;
      },
      getRoleName(state, d) {
          state.roleName = d;
      },
      getUserId(state,d){
          state.userId = d;
      },
      getBreadcrumb(state,d){
          state.breadcrumb = d;
      },
      getBreadname(state,d){
          state.breadname = d;
      },
      getNaviMenuList(state,d){
          state.naviMenuList=d;
      },
      getRoleFunction(state,d){
          state.RoleFunction=d;
      },
      getFunctionId(state,d){
          state.functionId=d;
      },
      newCodeMap(state, d) {
          state.codeMap = d
      },
      getUserName(state, d) {
          state.userName = d;
      },
      getMobile(state, d) {
          state.mobile = d;
      },
  },
  actions: {}
});
