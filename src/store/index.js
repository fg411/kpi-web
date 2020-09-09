import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toRoute: '', // 保存进来的路由
    isShowModal: false,
    modalOption: {},
    userInfo: {},
    isManager: false,
    employeeInfo: {},
    positions: [],
    loadCount: 0,
    deadLine: '',
    routeParams: {},
    token: ''
  },
  mutations: {
    setToRoute(state, params) {
      state.toRoute = params;
    },
    isShowDialog(state, status) {
      state.isShowModal = status;
    },
    changeModalOption(state, option) {
      state.modalOption = option;
    },
    setUserInfo(state, params) {
      state.userInfo = params;
    },
    setPosition(state, list) {
      state.positions = list;
    },
    setEmployeeDeadLine(state, resources) {
      state.employeeInfo = {
        ...state.employeeInfo,
        deadLine: resources
      };
    },
    setDeadLine(state, resources) {
      state.userInfo = {
        ...state.userInfo,
        deadLine: resources
      };
      state.deadLine = resources;
    },
    setRouteParams(state, params) {
      state.routeParams = params;
    },
    setToken(state, params) {
      state.token = params;
    },
    setEmployee(state, params) {
      state.employeeInfo = params;
    },
    setIsManager(state, params) {
      state.isManager = params;
    }
  },
  actions: {
    showModal({ commit }, options) {
      commit('changeModalOption', options);
      commit('isShowDialog', true);
    },
    hideModal({ commit }) {
      commit('isShowDialog', false);
    },
    saveUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
    saveUserPosition({ commit }, userInfo) {
      commit('setPosition', userInfo);
    },
    saveDeadLine({ commit }, deadLine) {
      commit('setDeadLine', deadLine);
    },
    saveEmpDeadLine({ commit }, deadLine) {
      commit('setEmployeeDeadLine', deadLine);
    },
    saveRouteParams({ commit }, params) {
      commit('setRouteParams', params);
    },
    saveToken({ commit }, params) {
      commit('setToken', params);
    },
    saveEmployee({ commit }, params) {
      commit('setEmployee', params);
    },
    saveIsManager({ commit }, params) {
      commit('setIsManager', params);
    }
  },
  modules: {}
});
