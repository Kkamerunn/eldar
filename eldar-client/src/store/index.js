import Vue from "vue";
import Vuex from "vuex";
// import { getUserApi } from "@/api/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      currentUser: {},
      users: [],
    };
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    addCurrentUser(ctx, user) {
      ctx.commit("setCurrentUser", user);
    },
    addUsers(ctx, users) {
      ctx.commit("setUsers", users);
    },
  },
  getters: {
    getCurrentUser({ currentUser }) {
      return currentUser;
    },
    getUsers({ users }) {
      return users;
    },
  },
});
