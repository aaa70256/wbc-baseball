import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		player: [],
		ODlist: [],
	},
	getters: {},
	mutations: {
		SETPLAYER(state, data) {
			state.player = data;
		},
		SETOD(state, name) {
			state.ODlist.push(name);
		},
	},
	actions: {
		GETPLAYERAPI({ commit }, data) {
			commit("SETPLAYER", data);
		},
	},
	modules: {},
});
