//import axios from "axios";

export default {
    namespaced: true,
    state: {
        ballotName: null,
        ballotAdminEmail: null,
        ballotOptions: {},
        ballotVoters: {}
    },
    mutations: {
        SET_STATE (state, payload) {
            state = payload;
        }
    },
    actions: {
        processUserInput({ commit }, payload) {
            commit('SET_STATE', payload);
        }
    }
};