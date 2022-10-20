import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: undefined,
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
