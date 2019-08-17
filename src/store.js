import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      roleId:"",
      userId:"",
      breadcrumb:"",
      breadname:"",
  },
  mutations: {
      getRoleId(state, d) {
          state.roleId = d;
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

  },
  actions: {}
});
