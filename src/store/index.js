import { createStore } from 'vuex';

const getStoredToken = () => {
  return localStorage.getItem('userToken') || null;
};

export default createStore({
  state: {
    token: getStoredToken(),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('userToken', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('userToken');
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token;
    },
  },
});