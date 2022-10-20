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
  actions: {
    fetchUser(context, app) {
      app.$http.get("/api/user").then((res) => {
        context.commit("setUser", res.data.data);
      });
    },
  },
  modules: {},
});
