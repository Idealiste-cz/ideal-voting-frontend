import axios from "axios";
import { url } from "../../../api.config";

export default {
    namespaced: true,
    state: {
        item: {
            id: null,
            name: null,
            email: null,
            options: [],
            voters: [],
        }
    },
    mutations: {
        SET_STATE_ITEM (state, data) {
            state.item = data;
        }
    },
    actions: {
        new({ commit }, payload) {
            return axios
                .post(`${url}/ballots`, {
                    "name": payload.name,
                    "email": payload.email,
                    "options": payload.options,
                    "voters": payload.voters
                })
                .then(response => {
                    commit('SET_STATE_ITEM', response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};